import * as yup from 'yup';

const editPromoSchema = yup.object().shape({
  name: yup.string().required('Category name is required'),
  limit: yup.number().required('Usage limit is Required'),
  percentage: yup
    .number()
    .nullable()
    .when('type', {
      is: 'PERCENTAGE',
      then: (schema) => schema.required('Percentage limit is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  fixed: yup
    .number()
    .nullable()
    .when('type', {
      is: 'FIXED',
      then: (schema) => schema.required('Fixed amount limit is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  isCombinable: yup.boolean(),
  isActive: yup.boolean().required('Status is required'),
  discountAd: yup.boolean().required('Status is required'),
});

const addPromoSchema = yup.object().shape({
  name: yup.string().required('Category name is required'),
  limit: yup.number().required('Usage limit is Required'),
  type: yup.string().required('Discount Type is Required'),
  percentage: yup
    .number()
    .nullable()
    .when('type', {
      is: 'PERCENTAGE',
      then: (schema) => schema.required('Percentage limit is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  fixed: yup
    .number()
    .nullable()
    .when('type', {
      is: 'FIXED',
      then: (schema) => schema.required('Fixed limit is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  isCombinable: yup.boolean(),
  isActive: yup.boolean().required('Status is required'),
  discountAd: yup.boolean().required('Status is required'),
});

export { addPromoSchema, editPromoSchema };
