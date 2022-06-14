import * as Yup from "yup";

const isTwoDigit = (value) => /^[1-9]?\d$/.test(value);
const isSeconds = (value) => /^[0-5]?[0-9]$/.test(value);

const ipptSchema = Yup.object().shape({
        runningMin: Yup.string()
        .test("Minutes", isTwoDigit)
        .required("Required")
        .test("Minutes", "Enter a valid duration", val => parseInt(val) < 25 ),
        runningSec: Yup.string()
        .test("Seconds", isSeconds)
        .required("Required"),
        pushup: Yup.string()
        .test("Push Up", "Must be a positive integer", isTwoDigit)
        .test("Sit Up", "Number cannot be more than 60", val => parseInt(val) < 61 )
        .required("Required"),
        situp: Yup.string()
        .test("Sit Up", "Must be a positive integer", isTwoDigit)
        .test("Sit Up", "Number cannot be more than 60", val => parseInt(val) < 61 )
        .required("Required"),
  });


const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email!").required("Required"),
    password: Yup.string()
        .min(6, "minimum 6 characters")
        .max(50, "Maximum 50 characters")
        .required("Required"),
});

export{ipptSchema, loginSchema}