import { ethers } from "ethers";

const addHabit = async ({ contract, title, commitment, amount, totalReports, intervalInSeconds, partner }) => {
  try {
    const result = await contract.createHabit(title, commitment, totalReports, intervalInSeconds, partner, {
      value: ethers.utils.parseEther(amount.toString()),
    });
    return result;
  } catch (e) {
    window.console.log(e);
  }
  return null;
};

const getAllHabitIds = async (contract, account) => {
  try {
    const result = await contract.getUserHabits(account);
    return result;
  } catch (e) {
    window.console.log("Err (getAllHabitIds): ", e);
  }
  return null;
};

const getHabitById = async (contract, id) => {
  try {
    const result = await contract.getHabit(id);
    return result;
  } catch (e) {
    window.console.log("Err (getHabitById): ", e);
  }
  return null;
};

const addJournal = async (contract, habitId, journalEntry, proofUrl) => {
  try {
    const result = await contract.report(habitId, journalEntry, proofUrl);
    return result;
  } catch (e) {
    window.console.log("Err (addJournal): ", e);
  }
  return null;
};

const getAllReportIds = async (contract, account) => {
  try {
    const result = await contract.getUserReports(account);
    return result;
  } catch (e) {
    window.console.log("Err (getAllReportIds): ", e);
  }
  return null;
};

const getReportById = async (contract, reportId) => {
  try {
    const result = await contract.getReport(reportId);
    return result;
  } catch (e) {
    window.console.log("Err (getReportById): ", e);
  }
  return null;
};

const getReportApprovalRequests = async (contract, account) => {
  try {
    const result = await contract.getReportApprovalRequests(account);
    return result;
  } catch (e) {
    window.console.log("Err (getReportApprovalRequests): ", e);
  }
  return null;
};

const getHabitValidatorRequests = async (contract, account) => {
  try {
    const result = await contract.getHabitValidatorRequests(account);
    return result;
  } catch (e) {
    window.console.log("Err (getHabitValidatorRequests): ", e);
  }
  return null;
};

const acceptValidatorRole = async (contract, habitId, validator) => {
  try {
    const result = await contract.acceptValidatorRole(habitId, validator);
    return result;
  } catch (e) {
    window.console.log("Err (acceptValidatorRole): ", e);
  }
  return null;
};

const declineValidatorRole = async (contract, habitId, validator) => {
  try {
    const result = await contract.declineValidatorRole(habitId, validator);
    return result;
  } catch (e) {
    window.console.log("Err (declineValidatorRole): ", e);
  }
  return null;
};

const validateReport = async (contract, habitId, validator) => {
  try {
    const result = await contract.validateReport(habitId, validator);
    return result;
  } catch (e) {
    window.console.log("Err (validateReport): ", e);
  }
  return null;
};

const declineReport = async (contract, habitId, validator) => {
  try {
    const result = await contract.declineReport(habitId, validator);
    return result;
  } catch (e) {
    window.console.log("Err (declineReport): ", e);
  }
  return null;
};

const createHabitObjFromID = async (contract, habitId) => {
  const habitFromContract = await getHabitById(contract, habitId);
  const durationInSeconds = habitFromContract[8].toNumber() * habitFromContract[9].toNumber();
  let durationText = "1 day";
  if (durationInSeconds >= 2629800) {
    durationText = (durationInSeconds / 2629800).toFixed(0) + " months";
  } else if (durationInSeconds >= 604800) {
    durationText = (durationInSeconds / 604800).toFixed(0) + " weeks";
  } else if (durationInSeconds >= 86400) {
    durationText = (durationInSeconds / 86400).toFixed(0) + " days";
  }

  const habitValidatorStatus = habitFromContract[2].toNumber();
  const habitObj = {
    habitId: habitId.toString(),
    goal: habitFromContract[4].toString(),
    description: habitFromContract[5].toString(),
    amount: ethers.utils.formatEther(habitFromContract[7]),
    duration: durationText,
    status: habitValidatorStatus == 0 ? "PENDING" : habitValidatorStatus == -1 ? "DECLINED" : habitFromContract[10] ? "COMPLETED" : "ACTIVE",
    successCount: habitFromContract[11].toNumber(),
    missedCount: habitFromContract[12].toNumber(),
  };

  return habitObj;
};

const createReportObjFromID = async (contract, id) => {
  const reportFromContract = await getReportById(contract, id);

  const reportObj = {
    reportId: id.toString(),
    habitTitle: reportFromContract[1],
    approvalStatus: reportFromContract[2].toNumber(),
    journalEntry: reportFromContract[3],
    proofUrl: reportFromContract[4],
    reportedAt: new Date(reportFromContract[5].toNumber()).toDateString(),
  };

  return reportObj;
};

export {
  addHabit,
  getAllHabitIds,
  getHabitById,
  addJournal,
  getAllReportIds,
  getReportApprovalRequests,
  getHabitValidatorRequests,
  acceptValidatorRole,
  declineValidatorRole,
  validateReport,
  declineReport,
  createHabitObjFromID,
  createReportObjFromID,
};
