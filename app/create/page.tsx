"use client";
import React from "react";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  useForm,
  Controller,
  useFieldArray,
  Control,
  FieldErrors,
  UseFormWatch,
  UseFormClearErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { GenreType, QuestionTypeType } from "@/types/types";

const questionTypeRadio = "1";
const questionTypeCheckbox = "2";
const questionTypePulldown = "3";
const questionTypeText = "4";
const questionTypeTextArea = "5";

const questionSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  genre: z.string(),
  questions: z.array(
    z
      .object({
        id: z.number(),
        type: z.string(),
        name: z.string().min(1, "質問のタイトルは必須です"),
        options: z.array(z.string()),
        isRequired: z.boolean(),
      })
      .superRefine((data, ctx) => {
        if (
          data.type !== questionTypeText &&
          data.type !== questionTypeTextArea
        ) {
          // 記述式以外は選択肢の文字列を必須にする
          data.options.forEach((option: string, index: number) => {
            if (option.trim() === "") {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "オプションは必須です",
                path: ["options", index],
              });
            }
          });
        }
      })
  ),
});
export type QuestionForm = z.infer<typeof questionSchema>;

type CreateFormDataType = {
  questionTypes: QuestionTypeType[];
  genres: GenreType[];
};

async function fetchCreateFormData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create/index`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const createFormData: CreateFormDataType = await res.json();
  return createFormData;
}

const transformSubmitData = (data: QuestionForm) => {
  return {
    ...data,
    genre: parseInt(data.genre, 10),
    questions: data.questions.map((question) => ({
      ...question,
      type: parseInt(question.type, 10),
    })),
  };
};

export default function MainComponent(request: Request, res: Response) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm<QuestionForm>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "無題のタイトル",
      genre: "1",
      questions: [
        {
          id: 1,
          type: questionTypeRadio,
          name: "質問",
          options: ["選択肢1"],
          isRequired: false,
        },
      ],
    },
  });

  const onSubmit = async (data: QuestionForm) => {
    const transformData = transformSubmitData(data);
    // console.log(transformData);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create/new`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transformData),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // 成功時の処理
      alert("登録に成功しました。");
    } catch (error) {
      console.error("フォーム送信エラー:", error);
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const [createFormData, setCreateFormData] =
    React.useState<CreateFormDataType>();

  React.useEffect(() => {
    const loadCreateFormData = async () => {
      try {
        const data = await fetchCreateFormData();
        setCreateFormData(data);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      }
    };

    loadCreateFormData();
  }, []);

  return (
    <div className="bg-[#F8F9FA] min-h-screen p-8 w-full relative">
      <div className="w-full sm:w-11/12 md:w-3/4 lg:max-w-4xl xl:max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
        <button
          className="fixed font-bold right-8 rounded-full bg-[#4285F4] text-white px-6 py-2 font-roboto"
          onClick={() =>
            append({
              id: fields.length + 1,
              type: questionTypeRadio,
              name: "質問",
              options: ["選択肢1"],
              isRequired: false,
            })
          }
        >
          質問追加
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="fixed font-bold bottom-8 right-8 rounded-full w-24 py-9 bg-blue-700 text-white text-center ring-4 ring-offset-blue">
            <button type="submit">送信</button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">アンケートのタイトル</span>
          </div>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full bg-[#F1F3F4] p-2 rounded-md text-lg font-roboto placeholder:text-[#606770]"
                placeholder="タイトル"
              />
            )}
          />
          {errors.title && (
            <span className="text-red font-bold">{errors.title.message}</span>
          )}
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-semibold">質問の種類</span>
          </div>
          <Controller
            name="genre"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="px-3 py-1 rounded bg-[#E8F0FE] border font-roboto mt-1"
              >
                {createFormData &&
                  createFormData.genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.genreName}
                    </option>
                  ))}
              </select>
            )}
          />
          {fields.map((question, questionIndex) => (
            <div key={question.id} className="p-4 bg-white border rounded-lg">
              <span className="text-lg font-semibold mb-4">
                質問{questionIndex + 1}
              </span>
              <div className="flex justify-between space-x-8 items-center mt-4">
                <div className="w-full">
                  <Controller
                    name={`questions.${questionIndex}.name`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full bg-[#F1F3F4] p-2 rounded-md placeholder:text-[#606770] font-roboto"
                        placeholder="質問"
                      />
                    )}
                  />
                </div>
                <Controller
                  name={`questions.${questionIndex}.type`}
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="px-3 py-1 rounded bg-[#E8F0FE] border font-roboto"
                    >
                      {/* <option value="radio">ラジオボタン</option>
                      <option value="checkbox">チェックボックス</option>
                      <option value="dropdown">プルダウン</option>
                      <option value="text">記述式</option>
                      <option value="textarea">段落</option> */}
                      {createFormData &&
                        createFormData.questionTypes.map((questionType) => (
                          <option
                            key={questionType.id}
                            value={Number(questionType.id)}
                          >
                            {questionType.typeName}
                          </option>
                        ))}
                    </select>
                  )}
                />
              </div>
              {errors?.questions?.[questionIndex]?.name && (
                <span className="text-red font-bold ml-1">
                  {errors?.questions?.[questionIndex]?.name?.message}
                </span>
              )}
              <div className="space-y-2 mt-4">
                <Options
                  control={control}
                  errors={errors}
                  watch={watch}
                  questionIndex={questionIndex}
                  clearErrors={clearErrors}
                />
                <div className="flex justify-end space-x-2 mt-4">
                  {questionIndex !== 0 && (
                    <Tooltip title="削除">
                      <IconButton onClick={() => remove(questionIndex)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Controller
                    name={`questions.${questionIndex}.isRequired`}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch {...field} />}
                        label="｜必須"
                        labelPlacement="start"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}

type OptionsType = {
  questionIndex: number;
  control: Control<QuestionForm> | any;
  errors: FieldErrors<QuestionForm>;
  watch: UseFormWatch<QuestionForm>;
  clearErrors: UseFormClearErrors<QuestionForm>;
};

function Options({
  questionIndex,
  control,
  errors,
  watch,
  clearErrors,
}: OptionsType) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  const watchType = watch(`questions.${questionIndex}.type`);

  React.useEffect(() => {
    if (watchType === questionTypeText || watchType === questionTypeTextArea) {
      fields.forEach((option, optionIndex) => {
        if (optionIndex !== 0) {
          remove(optionIndex);
        }
      });
      clearErrors(`questions.${questionIndex}.options`);
    }
  }, [watchType, fields, remove]);

  return (
    <>
      {fields.map((option, optionIndex) => {
        return (
          <React.Fragment key={option.id}>
            <div className="flex items-center">
              {watchType === questionTypeRadio ? (
                <PanoramaFishEyeIcon />
              ) : watchType === questionTypeCheckbox ? (
                <CropSquareIcon />
              ) : watchType === questionTypePulldown ? (
                `${optionIndex + 1}.　`
              ) : null}
              {watchType === questionTypeTextArea ? (
                <textarea
                  className="w-full resize-none bg-[#F1F3F4] p-2 rounded-md placeholder:text-[#606770] font-roboto"
                  rows={3}
                  placeholder={`記述式(段落)`}
                  disabled={true}
                />
              ) : (
                <Controller
                  name={`questions.${questionIndex}.options.${optionIndex}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full bg-[#F1F3F4] p-2 rounded-md placeholder:text-[#606770] font-roboto"
                      placeholder={
                        watchType === questionTypeText
                          ? "記述式"
                          : `選択肢${optionIndex + 1}`
                      }
                      disabled={watchType === questionTypeText}
                    />
                  )}
                />
              )}
              {optionIndex !== 0 && (
                <Tooltip title="削除">
                  <IconButton onClick={() => remove(optionIndex)}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
            {errors?.questions?.[questionIndex]?.options?.[optionIndex]
              ?.message && (
              <span className="ms-8 text-red font-bold">
                {
                  errors.questions?.[questionIndex]?.options?.[optionIndex]
                    ?.message
                }
              </span>
            )}
          </React.Fragment>
        );
      })}
      {watchType !== questionTypeText && watchType !== questionTypeTextArea && (
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={() => append(`選択肢${fields.length + 1}`)}
            className="text-blue-600"
          >
            選択肢を追加
          </button>
        </div>
      )}
    </>
  );
}
