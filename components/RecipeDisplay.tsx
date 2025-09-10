import React, { useState } from 'react';
import { Recipe, Tip } from '../types';

interface RecipeDisplayProps {
  recipe: Recipe;
  onFinishCooking: () => void;
}

const SectionTitle: React.FC<{ title: string; icon: JSX.Element; }> = ({ title, icon }) => (
    <div className="flex items-center mb-6 border-b-2 border-orange-800/50 pb-3">
      <span className="text-orange-400 mr-4">{icon}</span>
      <h2 className="text-3xl font-bold font-serif text-orange-100">{title}</h2>
    </div>
);

const TipCallout: React.FC<{ tip: Tip }> = ({ tip }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="mt-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-sm text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded"
          aria-expanded={isOpen}
          aria-controls={`tip-${tip.title.replace(/\s+/g, '-')}`}
        >
          <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm-1.414 8.486a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
          </svg>
          {isOpen ? 'Hide Tip' : tip.title}
        </button>
        {isOpen && (
          <div
            id={`tip-${tip.title.replace(/\s+/g, '-')}`}
            className="mt-2 ml-4 p-3 bg-orange-900/40 border-l-4 border-orange-500 text-orange-200 rounded-r-md text-sm animate-fade-in-up"
            style={{animationDuration: '0.3s'}}
          >
            <p>{tip.content}</p>
          </div>
        )}
      </div>
    );
};


const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, onFinishCooking }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(
    new Array(recipe.ingredients.length).fill(false)
  );

  const handleIngredientToggle = (index: number) => {
    const newCheckedState = [...checkedIngredients];
    newCheckedState[index] = !newCheckedState[index];
    setCheckedIngredients(newCheckedState);
  };

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-12">
        
        {/* --- Left Sticky Column --- */}
        <aside className="lg:col-span-2 lg:sticky lg:top-12 lg:self-start">
            <div className="bg-stone-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 border border-stone-700">
                <SectionTitle title="Ingredients" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13z" clipRule="evenodd" /></svg>} />
                <ul className="space-y-4">
                    {recipe.ingredients.map((ing, index) => (
                    <li key={index}>
                        <label className="flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={checkedIngredients[index]}
                                onChange={() => handleIngredientToggle(index)}
                                className="h-6 w-6 mr-4 bg-stone-700 border-stone-500 rounded text-orange-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-800 focus:ring-orange-500 transition-colors duration-200"
                            />
                            <span className={`flex-1 text-stone-300 group-hover:text-white transition-colors duration-200 ${checkedIngredients[index] ? 'line-through text-stone-500' : ''}`}>
                                <span className="font-semibold text-white">{ing.amount}</span> {ing.commonName} ({ing.englishName})
                            </span>
                        </label>
                    </li>
                    ))}
                </ul>
            </div>
        </aside>

        {/* --- Right Content Column --- */}
        <main className="lg:col-span-3">
            <div className="bg-stone-800/50 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-stone-700 p-6 sm:p-8 md:p-12">
                {/* --- Header --- */}
                <div className="mb-12">
                    <h1 className="font-serif text-5xl md:text-7xl font-black text-white mb-4">{recipe.dishName}</h1>
                    <p className="text-xl text-orange-200/90 italic max-w-3xl">“{recipe.description}”</p>
                    <div className="mt-6 inline-flex items-center justify-center bg-orange-900/40 text-orange-200 px-4 py-2 rounded-full border border-orange-700/60">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">{recipe.prepTime}</span>
                    </div>
                </div>

                {/* --- Equipment --- */}
                <div className="mb-12">
                    <SectionTitle title="Equipment" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" /></svg>} />
                    <ul className="space-y-3 text-stone-300">
                        {recipe.equipment.map((tool, index) => (
                        <li key={index} className="pl-1 text-lg">
                            <span className="text-orange-500 font-bold mr-2">&#8227;</span> {tool.item}
                            {tool.isSpecialized && (
                            <div className="mt-2 ml-4 p-3 bg-orange-900/40 border-l-4 border-orange-500 text-orange-200 rounded-r-md text-sm">
                                <span className="font-bold">Heads up!</span>
                                {tool.alternative && <p className="mt-1">
                                <span className="font-semibold">Alternative:</span> {tool.alternative}
                                </p>}
                            </div>
                            )}
                        </li>
                        ))}
                    </ul>
                </div>
      
                {/* --- Method --- */}
                <div className="mb-12">
                    <SectionTitle title="Method" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>} />
                    <ol className="space-y-8">
                        {recipe.method.map((step) => (
                            <li key={step.step} className="flex items-start">
                                <span className="flex items-center justify-center font-serif font-extrabold text-3xl text-orange-400 bg-stone-700/50 rounded-full h-12 w-12 flex-shrink-0 mr-6 mt-1 ring-2 ring-stone-600">
                                    {step.step}
                                </span>
                                <div className="flex-1">
                                    <p className="text-stone-200 leading-relaxed text-lg">
                                        {step.instruction}
                                    </p>
                                    {step.tip && <TipCallout tip={step.tip} />}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* --- Notes --- */}
                {recipe.notes && recipe.notes.length > 0 && (
                    <div className="mb-12">
                        <SectionTitle title="Notes & Tips" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>} />
                        <ul className="list-disc list-inside space-y-3 text-stone-300 prose prose-lg max-w-none">
                        {recipe.notes.map((note, index) => (
                            <li key={index}>{note}</li>
                        ))}
                        </ul>
                    </div>
                )}
                
                {/* --- Finish Button --- */}
                <div className="mt-16 pt-8 border-t-2 border-dashed border-stone-700 text-center">
                    <button
                        onClick={onFinishCooking}
                        className="bg-gradient-to-br from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-110 shadow-lg shadow-orange-500/20 hover:shadow-2xl hover:shadow-orange-400/40"
                    >
                        I'm Done Cooking!
                    </button>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
};

export default RecipeDisplay;