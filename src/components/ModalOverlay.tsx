import React from "react";
type TProps = {
  visible: boolean;
  children: React.ReactNode;
};
function ModalOverlay(props: TProps) {
  const { visible, children } = props;
  if (!visible) return null;
  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
}

export default ModalOverlay;
