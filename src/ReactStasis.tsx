import React, { Suspense } from "react";

const infiniteThenable = { then() {} };

function Stasis({
  stasis,
  children,
  onActivate,
  onDeactivate,
}: {
  stasis: boolean;
  children: React.ReactNode;
  onActivate?: () => void;
  onDeactivate?: () => void;
}): React.ReactElement | null {
  if (stasis) {
    onDeactivate?.();
    throw infiniteThenable;
  }

  onActivate?.();
  return <>{children}</>;
}

export function ReactStasis({
  stasis,
  children,
  onActivate,
  onDeactivate,
}: {
  stasis: boolean;
  children: React.ReactNode;
  onActivate?: () => void;
  onDeactivate?: () => void;
}) {
  return (
    <Suspense fallback={<></>}>
      <Stasis stasis={stasis} onActivate={onActivate} onDeactivate={onDeactivate}>
        {children}
      </Stasis>
    </Suspense>
  );
}
