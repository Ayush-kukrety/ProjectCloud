import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InstituteDetails {
  id: string;
  name: string;
  aishe: string;
}

interface StudentDetails {
  id: string;
  name: string;
  aishe: string;
  degree: string;
}

interface AuthState {
  institute: {
    logged: boolean;
    details: InstituteDetails;
  };
  student: {
    logged: boolean;
    details: StudentDetails;
  };
}

const initialState: AuthState = {
  institute: {
    logged: false,
    details: {
      id: '',
      name: '',
      aishe: '',
    },
  },
  student: {
    logged: false,
    details: {
      id: '',
      name: '',
      aishe: '',
      degree: ''
    },
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    instituteLogin: (state, action) => {

      state.institute.logged = true;
      const { details } = action.payload;
      state.institute.details.aishe = details.aishe;
      state.institute.details.name = details.full_name;
      state.institute.details.id = details.id;
    },
    instituteLogout: (state) => {
      sessionStorage.clear();
      state.institute.logged = false;
      state.institute.details = { id: '', name: '', aishe: '' };
    },
    studentLogin: (state, action) => {
      state.student.logged = true;
      const { details } = action.payload;
      state.student.details.aishe = details.aishe;
      state.student.details.degree = details.degree;
      state.student.details.id = details.id;
      state.student.details.name = details.full_name;
    },
    studentLogout: (state) => {
      state.student.logged = false;
      state.student.details = { id: '', name: '', aishe: '', degree: ''};
    },
  },
});

export const { instituteLogin, instituteLogout, studentLogin, studentLogout } = authSlice.actions;
export default authSlice.reducer;