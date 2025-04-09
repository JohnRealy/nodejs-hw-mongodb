export const ctrlWrapper = (ctrl) => {
  const foo = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (err) {
      next(err);
    }
  };

  return foo;
};
