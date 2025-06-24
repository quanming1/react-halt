import React, { Suspense } from "react";

const infiniteThenable = { then() {} };

function Halt({
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

export function ReactHalt({
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
      <Halt stasis={stasis} onActivate={onActivate} onDeactivate={onDeactivate}>
        {children}
      </Halt>
    </Suspense>
  );
}
