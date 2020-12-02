const fs = require("fs");
const inputString = fs.readFileSync("inputs/14.txt").toString();
const puzzleInput = inputString.split("\n");

const lineToReaction = line => {
  const [unparsedInput, unparsedOutput] = line.split(" => ");
  const inputs = unparsedInput.split(",").map(i => {
    const input = i.trim().split(" ");
    return {
      amount: parseInt(input[0]),
      chemical: input[1]
    };
  });
  const output = unparsedOutput.trim().split(" ");
  const reaction = {
    inputs: inputs,
    output: {
      amount: parseInt(output[0]),
      chemical: output[1]
    }
  };
  return reaction;
};

const linesToReactions = lines => {
  return lines.map(lineToReaction);
};

const findReactionFor = (output, reactions) => {
  return reactions.find(r => r.output.chemical === output);
};

const findOreAmountForChemical = (
  chemical,
  amount,
  reactions,
  availableChemicals,
  trackStrings
) => {
  trackStrings.push(chemical);
  let availableChemical = availableChemicals.find(c => c.type === chemical);
  if (availableChemical) {
    if (availableChemical.amount >= amount) {
      // Vi har redan den här och vi har tillräckligt mycket -> return 0 och reducera mängden vi har
      console.log("======");
      console.log("At", trackStrings);
      console.log(
        "Found at least",
        amount,
        "of",
        chemical,
        "returning 0 with chemicals",
        availableChemicals
      );
      availableChemical.amount -= amount;
      return 0;
    } else {
      console.log("ASFDGHJ;GFDSAFGHMGFDSAFGHJM");
      amount -= availableChemical.amount;
      availableChemical.amount = 0;
    }
  }

  // Cases:
  // Vi har redan den här men inte tillräckligt mycket -> ?????
  //

  const reaction = findReactionFor(chemical, reactions);
  const outputAmount = reaction.output.amount;
  let factor = 1;
  if (outputAmount > amount) {
    // Vi behöver X men reaktionen ger Y som är STÖRRE än X -> Spara efter?
    const amountLeft = outputAmount - amount;
    if (availableChemical) availableChemical.amount += amountLeft;
    else availableChemicals.push({ type: chemical, amount: amountLeft });
  } else if (outputAmount < amount) {
    // Vi behöver X men reaktionen ger Y som är MINDRE än X -> Närmsta multipel?
    factor = Math.ceil(amount / outputAmount);
    const amountLeft = outputAmount * factor - amount;
    if (amountLeft > 0) {
      // Add to available
      if (availableChemical) availableChemical.amount += amountLeft;
      else availableChemicals.push({ type: chemical, amount: amountLeft });
    }
  }
  let oreAmount = 0;
  for (const input of reaction.inputs) {
    if (input.chemical === "ORE") {
      console.log("======");
      console.log("At", trackStrings);
      console.log(
        "Returning",
        factor * input.amount,
        "from reaction",
        reaction,
        "with chemicals",
        availableChemicals
      );
      return factor * input.amount;
    }
    oreAmount += findOreAmountForChemical(
      input.chemical,
      factor * input.amount,
      reactions,
      availableChemicals,
      trackStrings
    );
  }
  console.log("======");
  console.log("At", trackStrings);
  console.log(
    "Returning",
    oreAmount,
    "from reaction",
    reaction,
    "with chemicals",
    availableChemicals
  );
  return oreAmount;
};

const firstTask = () => {
  const reactions = linesToReactions([...puzzleInput]);
  let availableChemicals = [];
  const ans = findOreAmountForChemical(
    "FUEL",
    1,
    reactions,
    availableChemicals,
    []
  );
  return ans;
};

const secondTask = () => {
  const reactions = linesToReactions([...puzzleInput]);
  let availableChemicals = [];
  const ans = findOreAmountForChemical(
    "FUEL",
    1,
    reactions,
    availableChemicals,
    []
  );
  console.log(1000000000000 / ans);
  console.log(availableChemicals);
  return ans;
};

const main = () => {
  console.log("DAY 14");
  console.log("===============================");
  let start = new Date();
  console.log(
    "Executing first task at",
    `${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}:${start.getMilliseconds()}`
  );

  console.log("Answer:", firstTask());

  let end = new Date();
  console.log(
    "Finished first task at",
    `${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}:${end.getMilliseconds()}`,
    "in",
    end.getTime() - start.getTime(),
    "milliseconds"
  );
  console.log("-------------------");
  start = new Date();
  console.log(
    "Executing second task at",
    `${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}:${start.getMilliseconds()}`
  );

  console.log("Answer:", secondTask());

  end = new Date();
  console.log(
    "Finished second task at",
    `${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}:${end.getMilliseconds()}`,
    "in",
    end.getTime() - start.getTime(),
    "milliseconds"
  );
  console.log("===============================");
  console.log();
};

main();

exports.main = main;
