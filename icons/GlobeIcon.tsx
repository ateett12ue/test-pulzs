import * as React from "react";
import { SVGProps, memo } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={60}
    height={60}
    {...props}
  >
    <image
      width={60}
      height={60}
      href="data:image/png;base64,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"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;