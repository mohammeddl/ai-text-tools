import { Fragment } from "react";

interface TextHoverAnimationProps {
  text: string;
}

const TextHoverAnimation = ({ text }: TextHoverAnimationProps) => {
  return (
    <Fragment>
      {text.split(" ").map((t, i) => (
        <Fragment key={i}>
          <div className="menu-text" style={{ display: "inline-block" }}>
            {t.split("").map((s, j) => (
              <div style={{ display: "inline-block" }} key={j}>
                {s}
              </div>
            ))}
          </div>{" "}
        </Fragment>
      ))}
    </Fragment>
  );
};
export default TextHoverAnimation;
