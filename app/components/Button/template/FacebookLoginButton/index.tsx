import { ComponentProps, ForwardedRef, forwardRef } from "react";
import FacebookIcon from "~/assets/auth/Facebook.png";
import Button from "../..";

function FacebookLoginButton(
  props: ComponentProps<"button">,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Button
      {...props}
      ref={ref}
      outline
      className="max-w-80 border border-gray-700"
    >
      <span className="relative box-content flex justify-center font-normal">
        <img
          src={FacebookIcon}
          className="absolute inset-0 left-6 h-6 w-6"
          alt=""
        />
        <p className="text-center">Facebookでログイン</p>
      </span>
    </Button>
  );
}

export default forwardRef(FacebookLoginButton);
