import { post, get, postAsync, getAsync, postImageAsync } from "./req-wrapper";
import { getCookie, deleteCookie } from "./cookie";

const DEBUG = false;

const ACCOUNT_URI = {
  LOGIN: "/api/v1/member/weverseLogin",
  GS: "/api/v1/member/generateSignature",
  userPhotoCardBitmap: "/api/v1/member/userPhotoCardBitmap",
  userPhotoCard: "/api/v1/member/userPhotoCard",
  liveTicket: "/api/v1/member/liveTicket",
  refresh: "/api/v1/member/refresh",
  photoCardValidation: "/api/v1/photocard/photoCardValidation",
  userPhotoCardList: "/api/v1/photocard/userPhotoCardList",
  adminPhotoCard: "/api/v1/photocard/adminPhotoCard",
  adminPhotoCardList: "/api/v1/photocard/adminPhotoCardList",
  deleteAdminPhotoCard: "/api/v1/photocard/deleteAdminPhotoCard",
  getLiveTicket: "/api/v1/member/getLiveTicket",
  getTicketCheck: "/api/v1/member/getTicketCheck"
};

export const login = (body, success, fail) => {
  post(ACCOUNT_URI.LOGIN, body, success, fail);
};

export const generateSignature = (body, success, fail) => {
  post(ACCOUNT_URI.GS, body, success, fail);
};

export const userPhotoCardBitmap = (success, fail) => {
  if (!DEBUG) {
    return getAsync(ACCOUNT_URI.userPhotoCardBitmap, success, fail);
  }

  return mockAxiosReturn(true, {
    data: {
      header: { code: 200 },
      body: { bitmap: 1 | 2 | 4 | 8 | 32 },
    },
  });
};

export const userPhotoCard = (
  girlId,
  imageId,
  messageId,
  audioId,
  success,
  fail
) => {
  const crypto =
    "" +
    process.env.REACT_APP_K1 +
    "" +
    girlId +
    "" +
    process.env.REACT_APP_K2 +
    "" +
    imageId +
    "" +
    process.env.REACT_APP_K3 +
    "" +
    messageId +
    "" +
    process.env.REACT_APP_K4 +
    "" +
    audioId;
  const body = { data: crypto };
  if (!DEBUG) {
    return postAsync(ACCOUNT_URI.userPhotoCard, body, success, fail, {
      timeout: 13000,
    });
  }
}

export const liveTicket = (
  quiz1,
  quiz2,
  sex,
  name1,
  name2,
  birth,
  success,
  fail
) => {
  const body = 
  {
    "quiz1":quiz1,
    "quiz2":quiz2,
    "sex":sex,
    "name1":name1,
    "name2":name2,
    "birth":birth
  }
  if (!DEBUG) {
    return postAsync(ACCOUNT_URI.liveTicket, body, success, fail, {
      timeout: 13000,
    });
  }

  return mockAxiosReturn(true, {
    data: {
      header: { code: 200 },
      body: { ret: true },
    },
  });
};

export const refresh = (success, fail) => {
  getAsync(ACCOUNT_URI.refresh, success, fail);
};

export const getLiveTicket = (success, fail) => {
  return getAsync(
    ACCOUNT_URI.getLiveTicket,
    success,
    fail
  );
}

export const getTicketCheck = (success, fail) => {
  return getAsync(
    ACCOUNT_URI.getTicketCheck,
    success,
    fail
  );
}

export const photoCardValidation = (girlId, success, fail) => {
  if (!DEBUG)
    return getAsync(
      ACCOUNT_URI.photoCardValidation + "?girl_id=" + girlId,
      success,
      fail
    );

  let arr = Array.from({ length: 20 }, (i) => 1);
  arr[2] = 0;
  arr[7] = 0;
  arr[15] = 0;

  return mockAxiosReturn(true, {
    data: {
      header: { code: 200 },
      body: {
        imageValidList: arr,
      },
    },
  });
};

export const userPhotoCardList = (success, fail) => {
  if (!DEBUG) return getAsync(ACCOUNT_URI.userPhotoCardList, success, fail);

  return mockAxiosReturn(true, {
    data: {
      header: { code: 200 },
      body: {
        list: [
          {
            girlId: 0,
            imageId: 0,
            messageId: 0,
            audioId: 0,
          },
          { girlId: 1, imageId: 2, messageId: 3, audioId: 4 },
        ],
      },
    },
  });
};

export const deleteAdminPhotoCard = (mId, success, fail) => {
  return get(
    ACCOUNT_URI.deleteAdminPhotoCard + "?mId=" + mId,
    success,
    fail
  );
};

export const adminPhotoCard = (file_front, file_back, mId, success, fail) => {
  const frm = new FormData();

  frm.append("imageFront", file_front);
  frm.append("imageBack", file_back);
  frm.append("mId", mId);

  return postImageAsync(ACCOUNT_URI.adminPhotoCard, frm, success, fail, {
    timeout: 13000,
  });
};


export const adminPhotoCardList = (success, fail) => {
  if (!DEBUG) return getAsync(ACCOUNT_URI.adminPhotoCardList, success, fail);

  return mockAxiosReturn(true, {
    data: {
      header: { code: 200 },
      body: {
        list: [
          
        ],
      },
    },
  });
};

export const isLogined = () => {
  if (DEBUG) return true;

  const token = getCookie(process.env.REACT_APP_USER_ID);
  if (token) {
    return true;
  }
  return false;
};

export const isAdmin = () => {
  if (DEBUG) return true;

  const admin = getCookie(process.env.REACT_APP_AMDIN_ID);
  if (admin) {
    return true;
  }
  return false;
};

export const logout = () => {
  deleteCookie(process.env.REACT_APP_USER_ID);
  deleteCookie(process.env.REACT_APP_FEF_ID);
  deleteCookie(process.env.REACT_APP_AMDIN_ID);
};

const mockAxiosReturn = (isResolve, obj) => {
  if (isResolve) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(obj);
      }, 1000);
    });
  } else {
    return new Promise((resolve, reject) => {
      reject(obj);
    });
  }
};
