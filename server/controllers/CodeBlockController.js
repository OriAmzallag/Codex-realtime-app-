import CodeBlock from "../models/CodeBlock.js";

async function getCodeBlockByCaseName(caseName) {
  try {
    const serialMap = {
      AsyncCase: 1,
      LoopCase: 2,
      CallbackCase: 3,
      EventHandlingCase: 4,
    };

    const serial = serialMap[caseName];
    if (!serial) throw new Error("Invalid case name");

    const codeBlock = await CodeBlock.findOne({ where: { serial } });
    if (!codeBlock) throw new Error("Code block not found");

    return codeBlock.toJSON().code;
  } catch (error) {
    throw error;
  }
}

export { getCodeBlockByCaseName };
