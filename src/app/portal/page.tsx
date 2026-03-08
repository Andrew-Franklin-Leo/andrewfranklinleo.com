import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Stakeholder Portal | Andrew Franklin Leo',
    description: 'Authenticated portal for Enterprise Operators, Regulators, and Investors.',
};

import PortalClient from './PortalClient';

export default function Portal() {
    return <PortalClient />;
}
