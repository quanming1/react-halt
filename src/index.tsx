import React, { Suspense, useEffect } from "react";

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
  useEffect(() => {
    if (stasis) {
      onDeactivate?.();
    } else {
      onActivate?.();
    }
  }, [stasis]);

  if (stasis) {
    throw infiniteThenable;
  }

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
