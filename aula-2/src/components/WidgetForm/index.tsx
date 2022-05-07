import { useState } from "react";

import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";

import bugImagePath from '../../assets/bug.svg';
import ideaImagePath from '../../assets/idea.svg';
import thoughtImagePath from '../../assets/thought.svg';
import { FeedbackSucessStep } from "./Steps/FeedbackSucessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImagePath,
      alt: 'Imagem de um inseto'
    },
  },
  IDEA: {
    title: "Ideias",
    image: {
      source: ideaImagePath,
      alt: 'Imagem de uma lâmpada'
    },
  },
  OTHERS: {
    title: "Outros",
    image: {
      source: thoughtImagePath,
      alt: 'Imagem de um balão de pensamento'
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<feedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-6 
      flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">


      { feedbackSent ? (
        <FeedbackSucessStep onFeedbackRestartRequested={handleRestartFeedback}/>
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={ ()=>setFeedbackSent(true) }
            />
          )}
        </>
      ) }

      <footer className="text-xs text-neutral-400">
        <span>Feito com ♥ por <a className="underline underline-offset-1" href="https://github.com/DwarfThief">DwarfThief</a></span>
      </footer>
    </div>
  );
}