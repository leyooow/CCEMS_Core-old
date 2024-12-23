export interface ExceptionDTO {
    id: string,
    refNo: string,
    employeeID: number,
    branchCode: number,
    branchName: string,
    personResponsible: string,
    otherPersonResponsible: string,
    severity: number,
    deviationApprovedBy: string,
    remarks: string,
    redFlag: boolean,
    transactionDate: Date,
    dateCreated: Date,
    createdBy: string,
    status: number,
    type: number,
    exCode: string,
    monetary: string,
    nonMonetary: string,
    misc: string,
    actionPlan: string,
    deviationCategoryId: number,
    rootCause: number,
    agingCategory: number,
    deviationApprover: string,
    age: number,
    riskClassificationId: number,
    division: string,
    area: string,
    entryDate: Date,
    approvalRemarks: string,
    otherRemarks: string
  }

export interface SubExceptionsListViewDTO {
  id: number;
  subReferenceNo: string;
  exItemRefNo: string;
  dateCreated: string;
  approvalStatus: number;
  deviationStatus: number;
  exCode: number;
  exCodeDescription: string;
  deviationCategory: string;
  riskClassification: string;
  request: string | null;
}