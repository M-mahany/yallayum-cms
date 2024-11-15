import * as yup from "yup";
 
const editBoxes = yup.object().shape({
  name: yup.string().required("Category name is required"),
 
});

export { ExamCategory, AddExamCategory };
