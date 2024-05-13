"use client";
import React from "react";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";

type Question = {
  id: number;
  type: string;
  options: string[];
};

function MainComponent() {
  const [questions, setQuestions] = React.useState([
    { id: 1, type: "radio", options: ["オプション 1"] },
  ]);
  const [selections, setSelections] = React.useState<Record<number, string>>(
    questions.reduce((acc: Record<number, string>, question) => {
      acc[question.id] = ""; // 初期状態は空文字
      return acc;
    }, {})
  );

  // プルダウンの値が変わった時のハンドラ
  const handleSelectChange = (questionId: number, value: string) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        let newOptions = question.options;
        // '記述式'または'段落'が選択された場合、既存の選択肢をクリアする
        if (value === "text" || value === "textarea") {
          newOptions = [
            value === "text"
              ? "記述式テキスト(短文解答)"
              : "記述式テキスト(長文解答)",
          ]; // 選択肢をクリア
        }
        return { ...question, type: value, options: newOptions };
      }
      return question;
    });
    setQuestions(updatedQuestions);

    setSelections((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    console.log(`質問${questionId}のタイプが${value}に変更されました`);
  };
  console.log(selections);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        type: "radio",
        options: ["新しいオプション"],
      },
    ]);
  };

  const handleAddOption = (questionId: number) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return { ...question, options: [...question.options, "新しい選択肢"] };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // 質問を削除
  const handleDeleteQuestion = (questionId: number) => {
    setQuestions(questions.filter((question) => question.id !== questionId));
  };

  // 選択肢を削除
  const handleDeleteOption = (questionId: number, optionIndex: number) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return {
          ...question,
          options: question.options.filter((_, index) => index !== optionIndex),
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen p-8 w-full relative">
      <div className="w-full sm:w-11/12 md:w-3/4 lg:max-w-4xl xl:max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="fixed font-bold bottom-8 right-8 rounded-full w-24 py-9 bg-blue-700 text-white text-center ring-4 ring-offset-blue">
          送信
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">アンケートのタイトル</span>
        </div>
        <input
          className="w-full bg-[#F1F3F4] p-2 rounded-md text-lg font-roboto placeholder:text-[#606770]"
          placeholder="タイトル"
        />

        {questions.map((question) => (
          <div key={question.id} className="p-4 bg-white border rounded-lg">
            <span className="text-lg font-semibold mb-4">
              質問{question.id}
            </span>
            <div className="flex justify-between space-x-8 items-center mb-4 mt-4">
              <input
                type="text"
                className="w-full bg-[#F1F3F4] p-2 rounded-md placeholder:text-[#606770] font-roboto"
                placeholder="質問"
              />
              <select
                className="px-3 py-1 rounded bg-[#E8F0FE] border font-roboto"
                value={question.type}
                onChange={(e) =>
                  handleSelectChange(question.id, e.target.value)
                }
              >
                <option value="radio">ラジオボタン</option>
                <option value="checkbox">チェックボックス</option>
                <option value="dropdown">プルダウン</option>
                <option value="text">記述式</option>
                <option value="textarea">段落</option>
              </select>
            </div>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center">
                  {question.type === "radio" ? (
                    <PanoramaFishEyeIcon />
                  ) : question.type === "checkbox" ? (
                    <CropSquareIcon />
                  ) : question.type === "dropdown" ? (
                    `${index + 1}.　`
                  ) : null}
                  {question.type === "textarea" ? (
                    <textarea
                      className="w-full resize-none bg-[#F1F3F4] p-2 rounded-md placeholder:text-[#606770] font-roboto"
                      rows={3}
                      placeholder={option}
                    />
                  ) : (
                    <input
                      type="text"
                      className="w-full bg-[#F1F3F4] p-2 rounded-md placeholder:text-[#606770] font-roboto"
                      placeholder={option}
                    />
                  )}
                  {index !== 0 && (
                    <Tooltip title="削除">
                      <IconButton
                        onClick={() => handleDeleteOption(question.id, index)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
              ))}
              <div className="flex justify-end space-x-2 mt-4">
                {question.type !== "textarea" && question.type !== "text" && (
                  <button
                    onClick={() => handleAddOption(question.id)}
                    className="text-blue-600"
                  >
                    選択肢を追加
                  </button>
                )}
                {question.id !== 1 && (
                  <Tooltip title="削除">
                    <IconButton
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-center">
          <button
            onClick={handleAddQuestion}
            className="rounded-full bg-[#4285F4] text-white px-6 py-2 font-roboto"
          >
            質問追加
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
