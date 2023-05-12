export const validEmail = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
);
export const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");

export const validMatricula = new RegExp("^([0-9]{6}|[0-9]{13})$");
export const validCartaoNFC = new RegExp("^[0-9a-fA-F]{8}$");
