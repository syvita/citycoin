import { Account, Tx, types } from "../deps.ts";
import { Client } from "./client.ts";

enum ErrCode {
  ERR_UNKNOWN_JOB = 6000,
  ERR_UNAUTHORIZED = 6001,
  ERR_JOB_IS_ACTIVE = 6002,
  ERR_JOB_IS_NOT_ACTIVE = 6003,
  ERR_ALREADY_APPROVED = 6004,
  ERR_JOB_IS_EXECUTED = 6005,
  ERR_JOB_IS_NOT_APPROVED = 6006,
  ERR_ARGUMENT_ALREADY_EXISTS = 6007,
}

export class AuthClient extends Client {
  static readonly ErrCode = ErrCode;

  getLastJobId() {
    return this.callReadOnlyFn("get-last-job-id");
  }

  createJob(name: string, target: string, sender: Account) {
    return Tx.contractCall(
      this.contractName,
      "create-job",
      [types.ascii(name), types.principal(target)],
      sender.address
    );
  }

  getJob(jobId: number) {
    return this.callReadOnlyFn("get-job", [types.uint(jobId)]);
  }

  activateJob(jobId: number, sender: Account) {
    return Tx.contractCall(
      this.contractName,
      "activate-job",
      [types.uint(jobId)],
      sender.address
    );
  }

  approveJob(jobId: number, approver: Account) {
    return Tx.contractCall(
      this.contractName,
      "approve-job",
      [types.uint(jobId)],
      approver.address
    );
  }

  isJobApproved(jobId: number) {
    return this.callReadOnlyFn("is-job-approved", [types.uint(jobId)]);
  }

  markJobAsExecuted(jobId: number, sender: Account) {
    return Tx.contractCall(
      this.contractName,
      "mark-job-as-executed",
      [types.uint(jobId)],
      sender.address
    );
  }

  addUIntArgument(
    jobId: number,
    argumentName: string,
    value: number,
    sender: Account
  ) {
    return Tx.contractCall(
      this.contractName,
      "add-uint-argument",
      [types.uint(jobId), types.ascii(argumentName), types.uint(value)],
      sender.address
    );
  }

  getUIntValueByName(jobId: number, argumentName: string) {
    return this.callReadOnlyFn("get-uint-value-by-name", [
      types.uint(jobId),
      types.ascii(argumentName),
    ]);
  }

  getUIntValueById(jobId: number, argumentId: number) {
    return this.callReadOnlyFn("get-uint-value-by-id", [
      types.uint(jobId),
      types.uint(argumentId),
    ]);
  }

  addPrincipalArgument(
    jobId: number,
    argumentName: string,
    value: string,
    sender: Account
  ) {
    return Tx.contractCall(
      this.contractName,
      "add-principal-argument",
      [types.uint(jobId), types.ascii(argumentName), types.principal(value)],
      sender.address
    );
  }

  getPrincipalValueByName(jobId: number, argumentName: string) {
    return this.callReadOnlyFn("get-principal-value-by-name", [
      types.uint(jobId),
      types.ascii(argumentName),
    ]);
  }

  getPrincipalValueById(jobId: number, argumentId: number) {
    return this.callReadOnlyFn("get-principal-value-by-id", [
      types.uint(jobId),
      types.uint(argumentId),
    ]);
  }

  setCityWallet(
    requestor: string,
    newCityWallet: Account,
    sender: Account
  ): Tx {
    return Tx.contractCall(
      this.contractName,
      "set-city-wallet",
      [types.principal(requestor), types.principal(newCityWallet.address)],
      sender.address
    );
  }

  testSetActiveCoreContract(sender: Account): Tx {
    return Tx.contractCall(
      this.contractName,
      "test-set-active-core-contract",
      [],
      sender.address
    );
  }
}
