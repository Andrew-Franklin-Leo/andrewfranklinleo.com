import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as {
            email: string;
            institution: string;
            studentId: string;
            graduationYear: number;
            dateOfBirth: string;
        };

        if (!body.email || !body.institution || !body.studentId || !body.graduationYear || !body.dateOfBirth) {
            return NextResponse.json({ error: 'All fields required: email, institution, studentId, graduationYear, dateOfBirth' }, { status: 400 });
        }

        // Validate age (must be under 28)
        const dob = new Date(body.dateOfBirth);
        const age = Math.floor((Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
        if (age >= 28) {
            return NextResponse.json({ error: 'Early Operator tier is available for under-28s only' }, { status: 400 });
        }

        // Validate .edu or known institution email
        const emailDomain = body.email.split('@')[1]?.toLowerCase() || '';
        const isAcademicDomain = emailDomain.endsWith('.edu') ||
            emailDomain.endsWith('.ac.uk') ||
            emailDomain.endsWith('.edu.au') ||
            emailDomain.endsWith('.edu.sg') ||
            emailDomain.includes('university') ||
            emailDomain.includes('college');

        // Store verification request
        await adminDb.collection('student_verifications').add({
            email: body.email.toLowerCase(),
            institution: body.institution,
            studentId: body.studentId,
            graduationYear: body.graduationYear,
            dateOfBirth: body.dateOfBirth,
            age,
            isAcademicDomain,
            status: isAcademicDomain ? 'auto_approved' : 'pending_review',
            createdAt: new Date().toISOString(),
        });

        if (isAcademicDomain) {
            // Auto-approve academic emails — mark stakeholder as verified
            const stakeholders = await adminDb.collection('stakeholders')
                .where('email', '==', body.email.toLowerCase())
                .limit(1)
                .get();

            if (!stakeholders.empty) {
                await stakeholders.docs[0].ref.update({
                    student_verified: true,
                    student_institution: body.institution,
                    student_verified_at: new Date().toISOString(),
                });
            }

            return NextResponse.json({ status: 'approved', message: 'Academic email verified automatically. You can now access Early Operator pricing.' });
        }

        return NextResponse.json({
            status: 'pending',
            message: 'Verification submitted for manual review. You will receive confirmation within 48 hours.',
        });
    } catch (error) {
        console.error('Student verification error:', error);
        return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
    }
}
