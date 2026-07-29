const STATE_KEY = "stateCode";
const EXAM_KEY = "examCode";

export const Session = {
  setState(code: string) {
    sessionStorage.setItem(STATE_KEY, code);
  },

  getState() {
    return sessionStorage.getItem(STATE_KEY);
  },

  setExam(code: string) {
    sessionStorage.setItem(EXAM_KEY, code);
  },

  getExam() {
    return sessionStorage.getItem(EXAM_KEY);
  },

  clear() {
    sessionStorage.removeItem(STATE_KEY);
    sessionStorage.removeItem(EXAM_KEY);
  },
};
