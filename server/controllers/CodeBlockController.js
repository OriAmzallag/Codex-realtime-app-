import CodeBlock from "../models/CodeBlock.js";

async function getCodeBlockByCaseName(caseName) {
  try {
    let serial;
    switch (caseName) {
      case "FirstCase":
        serial = 1;
        break;
      case "SecondCase":
        serial = 2;
        break;
      case "ThirdCase":
        serial = 3;
        break;
      case "ForthCase":
        serial = 4;
        break;
      default:
        throw new Error("Invalid case name");
    }

    const codeBlock = await CodeBlock.findOne({ where: { serial } });
    if (!codeBlock) {
      throw new Error("Code block not found");
    }
    return codeBlock.toJSON().code;
  } catch (error) {
    throw error;
  }
}

export { getCodeBlockByCaseName };
