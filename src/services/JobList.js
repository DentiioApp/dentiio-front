import axios from "axios";

const JOBS = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_JOBS;

export const fetchJobs = () => {
  let reponses = axios
    .get(JOBS)
    .then((res) => res.data["hydra:member"]).catch((e) => console.log('TEST :', e))

  return reponses
};

export const tryJobs = () => {
  let pJobs = fetchJobs()

if (pJobs.status === 200) {
console.log('TESpJobs.isResolvedT :', pJobs.isResolved)
  return pJobs.isResolved;
}

console.log('TEST pJobs:', pJobs)

  if (pJobs.isResolved) return pJobs;

  // Set initial state
  let isPending = true;
  let isRejected = false;
  let isFulfilled = false;

  // Observe the promise, saving the fulfillment in a closure scope.
  const result = pJobs
    .then((exp) => {
      isFulfilled = true;
      isPending = false;
      console.log("Expect is Fullfiel :");
      return exp;
    })
    .catch((rejec) => {
      isRejected = true;
      isPending = false;
      console.log("Expect is Rejected :");
      //throw e;
      throw rejec;
    });

  return result;
};
