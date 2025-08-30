'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type Role = 'job-seeker' | 'employer' | null;

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children, role: initialRole }: { children: ReactNode, role?: Role }) {
  const [role, setRole] = useState<Role>(initialRole || null);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
