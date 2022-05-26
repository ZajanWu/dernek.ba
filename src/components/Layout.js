import Navigation from "./Navigation";

export const Layout = ({ children, ...rest }) => {
  return (
    <div {...rest}>
      <Navigation />
      {children}
    </div>
  );
};
