'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface ModuleItem {
  text: string;
  content: string;
  isCategory?: boolean;
  subItems?: ModuleItem[]; // New field for nested subtopics
}

export default function BeginnerChapter1Page() {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<{
    [key: string]: boolean;
  }>({});

  // Only load completedModules from localStorage on initial load
  useEffect(() => {
    const savedModules = localStorage.getItem('completedModulesChapter1');
    if (savedModules) {
      setCompletedModules(JSON.parse(savedModules)); // Populate state from localStorage
    }
  }, []); // This effect runs only once when the component mounts

  // Whenever completedModules state changes, update localStorage
  useEffect(() => {
    if (Object.keys(completedModules).length > 0) {
      localStorage.setItem(
        'completedModulesChapter1',
        JSON.stringify(completedModules)
      );
    }
  }, [completedModules]);

  const handleContentClick = (content: string, module: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setSelectedContent(content);
    setCompletedModules((prev) => ({ ...prev, [module]: true }));
  };

  // Find next topic based on current content
  const findNextTopic = (currentContent: string | null): string | null => {
    if (!currentContent) return null;
    
    let found = false;
    let nextTopic: string | null = null;

    const searchItems = (items: ModuleItem[]) => {
      for (const item of items) {
        if (found && !item.subItems) {
          nextTopic = item.content;
          return true;
        }
        if (item.content === currentContent) {
          found = true;
          if (item.subItems && item.subItems.length > 0) {
            nextTopic = item.subItems[0].content;
            return true;
          }
          continue;
        }
        if (item.subItems) {
          if (searchItems(item.subItems)) return true;
        }
      }
      return false;
    };

    modules.forEach(module => {
      searchItems(module.items);
    });

    return nextTopic;
  };

  // Handle next topic click
  const handleNextTopic = () => {
    const nextTopic = findNextTopic(selectedContent);
    if (nextTopic) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Find the module item text for the current content
      let currentModuleText = '';
      const findModuleText = (items: ModuleItem[]) => {
        items.forEach(item => {
          if (item.content === selectedContent) {
            currentModuleText = item.text;
          }
          if (item.subItems) {
            findModuleText(item.subItems);
          }
        });
      };
      modules.forEach(module => findModuleText(module.items));

      // Mark current topic as completed if not already completed
      if (currentModuleText && !completedModules[currentModuleText]) {
        setCompletedModules(prev => ({ ...prev, [currentModuleText]: true }));
      }

      // Find and mark next topic's text
      let nextModuleText = '';
      const findNextModuleText = (items: ModuleItem[]) => {
        items.forEach(item => {
          if (item.content === nextTopic) {
            nextModuleText = item.text;
          }
          if (item.subItems) {
            findNextModuleText(item.subItems);
          }
        });
      };
      modules.forEach(module => findNextModuleText(module.items));

      setSelectedContent(nextTopic);
      
      // Mark next topic as completed
      if (nextModuleText) {
        setCompletedModules(prev => ({ ...prev, [nextModuleText]: true }));
      }
    }
  };

  // Updated modules with nested subtopics
  const modules: { title: string; items: ModuleItem[] }[] = [
    {
      title: 'Hair and Scalp',
      items: [
        {
          text: 'What is Hair?',
          content: 'What is Hair?',
        },
        {
          text: 'Hair Structure',
          content: '',
          isCategory: true,
          subItems: [
            { text: 'Cuticle', content: 'Cuticle Content' },
            { text: 'Cortex', content: 'Cortex Content' },
            { text: 'Medulla', content: 'Medulla Content' }
          ]
        },
        {
          text: 'Natural Hair Color',
          content: '',
          isCategory: true,
          subItems: [
            { text: 'Eumelanin', content: 'Eumelanin Content' },
            { text: 'Trichosiderin', content: 'Trichosiderin Content' },
            { text: 'Pheomelanin', content: 'Pheomelanin Content' }
          ]
        },
        {
          text: 'Characteristics of Hair',
          content: '',
          isCategory: true,
          subItems: [
            { text: 'Texture', content: 'Texture Content' },
            { text: 'Porosity', content: 'Porosity Content' },
            { text: 'Elasticity', content: 'Elasticity Content' },
            { text: 'Density', content: 'Density Content' }
          ]
        },
        {
          text: 'Chemical Structure of Hair',
          content: '',
          isCategory: true,
          subItems: [
            { text: 'Building Blocks of Protein', content: 'Amino Acids Content' },
            { text: 'Peptide Bonds', content: 'Peptide Bonds Content' },
            { text: 'Disulphide Bonds', content: 'Disulphide Bonds Content' },
            { text: 'Hydrogen Bonds', content: 'Hydrogen Bonds Content' },
          ]
        }
      ]
    }
  ];

  // Render module items with checkmarks on leaf nodes only
  const renderModuleItems = (items: ModuleItem[], depth: number = 0) => {
    return (
      <ul className={`space-y-2 ${depth > 0 ? 'ml-6' : ''}`}>
        {items.map((item, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex-1">
              {item.isCategory ? (
                <div className="text-gray-700 font-semibold">{item.text}</div>
              ) : (
                <button
                  onClick={() => handleContentClick(item.content, item.text)}
                  className="text-left hover:text-pink-600 cursor-pointer"
                >
                  {item.text}
                </button>
              )}
              {item.subItems && renderModuleItems(item.subItems, depth + 1)}
            </div>
            {!item.isCategory && !item.subItems && (
              <span className="text-green-500">
                {completedModules[item.text] && '✓'}
              </span>
            )}
          </li>
        ))}
      </ul>
    );
  };

  // Calculate progress percentage using formula
  const calculateProgress = () => {
    let totalWeight = 0;
    let completedWeight = 0;

    const calculateItemWeight = (items: ModuleItem[], depth: number = 0) => {
      const weightMultiplier = Math.pow(0.8, depth); // Decrease weight for deeper levels
      
      items.forEach(item => {
        const currentWeight = weightMultiplier;
        totalWeight += currentWeight;
        
        if (completedModules[item.text]) {
          completedWeight += currentWeight;
        }

        if (item.subItems) {
          calculateItemWeight(item.subItems, depth + 1);
        }
      });
    };

    modules.forEach(module => {
      calculateItemWeight(module.items);
    });

    const percentage = Math.round((completedWeight / totalWeight) * 100) || 0;
    
    // If chapter is 100% complete, mark it in the main beginner progress
    if (percentage === 100) {
      const beginnerProgress = JSON.parse(localStorage.getItem('completedBeginnerChapters') || '{}');
      if (!beginnerProgress.chapter1) {
        beginnerProgress.chapter1 = true;
        localStorage.setItem('completedBeginnerChapters', JSON.stringify(beginnerProgress));
      }
    }

    return { percentage };
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
        {/* Navbar */}
        <div className="bg-pink-600 text-white p-4 flex items-center justify-between">
          {/* Left side navigation */}
          <div className="flex items-center space-x-6">
            <a href="/" className="text-white text-lg font-semibold hover:underline">
              Home
            </a>
          </div>
          {/* Right side */}
          <div className="flex items-center gap-4">
            <span>{/* User email will go here */}</span>
            <button className="bg-pink-700 text-white px-4 py-2 rounded">
              Sign Out
            </button>
          </div>
        </div>

        {/* Main content layout */}
        <div className="max-w-[95%] mx-auto p-8">
          {/* Table of Contents Centered on initial load */}
          {!selectedContent && (
            <div className="flex justify-center items-center">
              <div className="w-2/3 bg-white rounded-lg shadow-md px-4 py-6">
                <h2 className="text-2xl font-semibold text-pink-600 mb-4">
                  Table of Contents
                </h2>
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Chapter Progress</span>
                    <button 
                      onClick={() => setCompletedModules({})}
                      className="text-sm text-pink-600 hover:text-pink-700"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-pink-600 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress().percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-sm font-medium text-gray-700">
                      {calculateProgress().percentage}% Complete
                    </span>
                  </div>
                </div>
                <div className="space-y-4 pl-2">
                  {modules.map((module) => (
                    <div key={module.title}>
                      <h3 className="text-xl font-medium text-gray-800 mb-3">
                        {module.title}
                      </h3>
                      <div className="space-y-2 text-gray-700">
                        {renderModuleItems(module.items)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Content Display */}
          {selectedContent && (
            <div className="flex gap-6">
              {/* Sidebar */}
              <div className="w-1/5 bg-white rounded-lg shadow-md pl-4 pr-2 py-6">
                <h2 className="text-2xl font-semibold text-pink-600 mb-4">
                  Table of Contents
                </h2>
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Chapter Progress</span>
                    <button 
                      onClick={() => setCompletedModules({})}
                      className="text-sm text-pink-600 hover:text-pink-700"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-pink-600 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress().percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-sm font-medium text-gray-700">
                      {calculateProgress().percentage}% Complete
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  {modules.map((module) => (
                    <div key={module.title}>
                      <h3 className="text-xl font-medium text-gray-800 mb-3">
                        {module.title}
                      </h3>
                      <div className="space-y-2 text-gray-700">
                        {renderModuleItems(module.items)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Area */}
              <div className="w-4/5 bg-white rounded-lg shadow-md px-8 py-6">
                <div className="min-h-[calc(100vh-16rem)] flex flex-col">
                  {/* Content */}
                  <div className="flex-grow">
                    <h2 className="text-3xl font-semibold text-pink-600 mb-6 text-center">
                      {selectedContent}
                    </h2>
                    <div className="text-gray-600">
                      {selectedContent === 'What is Hair?' && (
                        <div className="space-y-8">
                          {/* Introduction Section */}
                          <div className="space-y-4">
                            <p className="text-lg leading-relaxed">
                              Alright, let's really unravel the complexities of what we call 'hair.' It's far more than just a decorative element; it's a sophisticated biological structure with a compelling story to tell at a cellular level. At its very essence, hair is a slender filament that originates from a follicle - a tiny, specialized invagination of the epidermis, nestled deep within the dermis of our scalp. These follicles are essentially miniature factories, constantly producing and pushing out strands of keratin. And that is where life of hair begins.
                            </p>
                          </div>

                          {/* Keratin Section */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">The Role of Keratin</h3>
                            <p className="leading-relaxed">
                              Now, the star of the show here is keratin - a remarkably robust and insoluble protein. This fibrous protein, made up of long chains of amino acids, isn't limited to hair; it's also the primary structural component of our nails and the outer layers of our skin, emphasizing its resilience. What's crucial to understand is that the visible hair shaft, the part that we manipulate and style, is biologically inert – a collection of dead keratinized cells. The living, dynamic processes are confined to the base of the follicle, specifically within the dermal papilla, where cell division and keratin synthesis are constantly underway. This is also where the hair's color is determined by the melanocytes.
                            </p>
                          </div>

                          {/* Physiological Functions */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Physiological Functions</h3>
                            <p className="leading-relaxed">
                              Beyond its aesthetic significance, hair has pivotal physiological roles. It's a natural defense mechanism, offering significant protection against harmful ultraviolet radiation from the sun. It acts as a thermal regulator, trapping air close to the scalp, assisting with heat retention and cooling, depending on environmental temperatures. And let's not underestimate its tactile importance, hair plays a role in enhancing our sensitivity to touch. Think of the way you perceive the slightest breeze on your arm hairs.
                            </p>
                          </div>

                          {/* Hair Diversity */}
                          <div className="space-y-4">
                            <p className="leading-relaxed">
                              The diversity we observe in hair – from silky straightness to tight curls, from vibrant jet black to the palest blond – is a direct result of our genetic makeup and environmental influences. Each hair strand carries its own distinctive DNA and responds to a myriad of internal and external factors. The way keratin molecules are linked together, the shape of the follicle, the type of melanin produced – all contribute to the final product. As hair professionals, we are not simply changing the outer appearance, we are interacting with a highly complex system of protein chains, chemical bonds, and biological processes.
                            </p>
                          </div>

                          {/* Professional Significance */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Professional Insight</h3>
                            <p className="leading-relaxed">
                              Understanding the intricacies of hair structure and its growth cycle is fundamental to our craft. It allows us to provide the most effective and personalized care for our clients. It guides our selection of products, our application of treatments, and our techniques for styling and coloring. In essence, we're engaging with a marvel of biological engineering, and appreciating its complexity is the first step toward becoming true masters of hair.
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedContent === 'Cuticle Content' && (
                        <div className="space-y-8">
                          {/* Introduction */}
                          <div className="space-y-4">
                            <p className="text-lg leading-relaxed">
                              Alright, let's talk about the cuticle, the outermost layer of your hair. It's like the protective skin of each hair strand, the first point of contact with everything around it. Think of it as a clear, overlapping film wrapped around the hair shaft, similar to how scales protect a fish or the way petals overlap on a flower bud.
                            </p>
                          </div>

                          {/* Structure and Purpose */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Structure and Purpose</h3>
                            <p className="leading-relaxed">
                              These layers, made of hardened keratin, are incredibly thin and lie on top of each other. The edges of these cuticle cells are pointed downwards, away from the scalp, toward the tips of the hair. This arrangement is not random; it serves a vital purpose. The cuticle is designed to protect the inner layers of the hair - the cortex and the medulla - from any kind of harm, like rough handling, harmful chemicals, or the damaging effects of the sun's rays. It's the hair's natural shield.
                            </p>
                          </div>

                          {/* Healthy Cuticle */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Healthy Cuticle Characteristics</h3>
                            <p className="leading-relaxed">
                              Now, when this protective layer is healthy, it's smooth and tight, like a polished surface. When the cuticle is smooth and intact, light reflects evenly, resulting in that beautiful shine and healthy glow we all strive for. A smooth cuticle also helps the hair to retain moisture, keeping it soft, flexible, and less prone to breakage. It's like a seal on a container, keeping the goodness locked inside.
                            </p>
                          </div>

                          {/* Damaged Cuticle */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">When Damage Occurs</h3>
                            <p className="leading-relaxed">
                              But when the cuticle is compromised, these layers become raised and disrupted. Imagine that clear film now peeling away or having rough edges. This damage can happen from everyday styling, using heat tools, harsh shampoos, chemical treatments like coloring or perms, or even from things like the weather or friction from brushing. When the cuticle becomes rough, it loses its ability to reflect light evenly, making the hair appear dull and lifeless. The raised layers allow moisture to escape quickly, leading to dry, brittle, and frizzy hair.
                            </p>
                          </div>

                          {/* Product Interaction */}
                          <div className="space-y-4">
                            <p className="leading-relaxed">
                              Also, the cuticle is what allows products in and out of the hair. When the layers are lying flat and smooth, it's harder for anything to get in, and that includes the good things, like moisturizing products. But when the layers are lifted or damaged, both good and bad substances can enter more easily. This is why it's vital to keep this protective shield healthy.
                            </p>
                          </div>

                          {/* Professional Perspective */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Professional Care and Impact</h3>
                            <p className="leading-relaxed">
                              As hair professionals, our actions directly impact the cuticle. We use conditioners and treatments to flatten those layers, helping them to smooth down and seal in moisture. We use products with a low PH to keep the cuticles closed and we avoid high heat that can cause them to crack and lift. Our technique also impacts the cuticle. When we brush hair when it is wet we can cause the cuticles to break and lift. We are essentially, working with the cuticles health all the time. Understanding how it interacts with our actions and products is what makes us good professionals.
                            </p>
                          </div>

                          {/* Hair Type Variations */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Variations Across Hair Types</h3>
                            <p className="leading-relaxed">
                              The cuticle's properties can also vary between different hair textures. For example, curly hair tend to have a more open cuticle than straight hair, so they might require more moisture to keep their cuticles happy. Thin hair tends to have a more delicate cuticle, while thick hair tends to have a denser and stronger one.
                            </p>
                          </div>

                          {/* Conclusion */}
                          <div className="space-y-4">
                            <p className="leading-relaxed">
                              In short, the cuticle is your hair's protective barrier. It's responsible for the hair's shine, moisture, and overall health. By understanding its structure, how it's impacted by our actions, and how to best care for it, we have the power to transform the health and appearance of any hair type. So, learning how to protect the cuticle is one of our most important jobs.
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedContent === 'Cortex Content' && (
                        <div className="space-y-8">
                          {/* Introduction */}
                          <div className="space-y-4">
                            <p className="text-lg leading-relaxed">
                              Alright, let's truly illuminate the cortex – the very soul of the hair strand. If we think of the hair as a living, breathing entity, then the cortex is its heart, its vital core, where its essence is truly defined. It's far more than just a middle layer; it's a dynamic, complex structure that dictates the hair's very character and its response to the world.
                            </p>
                          </div>

                          {/* Structure */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">The Intricate Structure</h3>
                            <p className="leading-relaxed">
                              Imagine the cortex as a magnificent tapestry, woven from countless, intricately intertwined protein fibers. These fibers, primarily composed of keratin, are not arranged haphazardly; they're organized into elaborate structures – bundles within bundles – known as microfibrils and macrofibrils. Think of it like a cable: multiple wires twisted together to create smaller cords, then those cords twisted together to form a thick, robust cable. This layered organization is what gives hair its astonishing tensile strength and resilience. It's why hair can be stretched, bent, and twisted without breaking – when it's healthy, of course.
                            </p>
                          </div>

                          {/* Color Properties */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">The Color Artist</h3>
                            <p className="leading-relaxed">
                              Within this protein framework lie the melanocytes, the master color artists of the hair strand. These specialized cells produce melanin, the pigment responsible for the hair's natural hue. The type of melanin—eumelanin for darker shades, pheomelanin for red and blonde tones—along with its density and distribution within the cortex, dictates the hair's unique color palette. It's not just about the presence of pigment, but how it is scattered and layered, creating subtle nuances and depth in color. It's a work of art at a microscopic scale.
                            </p>
                          </div>

                          {/* Texture and Structure */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Texture and Elasticity</h3>
                            <p className="leading-relaxed">
                              The cortex is not just about strength and color; it's also where the hair's texture is determined. The way these keratin fibers are arranged and the type and amount of bonds between them influence how much the hair can stretch (its elasticity), how much it will bend (its curl pattern), and how much volume it will hold. It's like the foundation of a building: the structure of the foundation determines the architecture and shape of the entire structure. A tightly bound, well-organized cortex results in hair that's resilient and has a springy texture, while a loosely arranged cortex leads to hair that's less able to withstand stress and may be prone to breakage.
                            </p>
                          </div>

                          {/* Professional Impact */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">The Professional's Canvas</h3>
                            <p className="leading-relaxed">
                              As hair professionals, the cortex is our primary canvas. When we use chemicals to perm, relax, or color the hair, we are directly impacting the cortex. These chemical processes work by breaking and reforming the bonds within the protein matrix of the cortex, changing its structure and, in turn, the hair's shape and color. That's why understanding the intricacies of the cortex is paramount – we're not just applying products; we're manipulating the fundamental architecture of the hair. The more we know the more control we will have over our treatments.
                            </p>
                          </div>

                          {/* Health and Maintenance */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Health and Well-being</h3>
                            <p className="leading-relaxed">
                              The well-being of the cortex is essential for the overall health of the hair. If the cortex is damaged, for example, by over-processing, the hair loses its ability to stretch, becomes brittle, and appears lifeless. Our challenge and responsibility as stylists is to nurture the cortex, providing it with the right ingredients to keep it strong, flexible, and vibrant. When the cortex is healthy it holds color and style much better.
                            </p>
                          </div>

                          {/* Moisturizing and Care */}
                          <div className="space-y-4">
                            <p className="leading-relaxed">
                              When we're moisturizing hair, the goal is to deliver those moisturizing elements into the cortex so that they can help the protein fibers remain elastic and hydrated. Every product we use, every technique we employ, is an opportunity to either enhance or compromise the cortex, the heart of the hair. The cortex is an important layer to focus on, and if we can protect and strengthen it the rest of our work will be much easier.
                            </p>
                          </div>

                          {/* Conclusion */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">The Core of Hair's Identity</h3>
                            <p className="leading-relaxed">
                              In essence, the cortex is the core of the hair's identity, the place where its strength, color, texture, and overall health are determined. By understanding its complexities, by appreciating the beauty and functionality of its design, we can approach our craft with an educated eye and a caring hand, creating healthy, vibrant hair that truly shines from the inside out. Understanding this layer is the foundation of our knowledge.
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedContent === 'Medulla Content' && (
                        <div className="space-y-8">
                          {/* Introduction */}
                          <div className="space-y-4">
                            <p className="text-lg leading-relaxed">
                              Okay, let's really unpack the medulla, the innermost core of the hair shaft. Think of it as the central channel of the hair, although it's not a consistently present or solid structure like the other layers. It's the deepest layer, residing right at the very heart of each hair strand, but it's also the most variable and the least understood.
                            </p>
                          </div>

                          {/* Unique Composition */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Unique Structure and Composition</h3>
                            <p className="leading-relaxed">
                              Unlike the cuticle with its overlapping scales or the cortex with its tightly packed protein bundles, the medulla has a unique composition. It's composed of loosely packed cells that are often described as being partially keratinized—meaning they've started the keratinization process but haven't become fully hardened like the cells in the cortex or cuticle. These cells are separated by air spaces or vacuoles, which are essentially little pockets of air. This gives the medulla a spongy, porous, and sometimes fragmented appearance. Imagine it as the marrow within a bone, it's there, but it's not a solid layer.
                            </p>
                          </div>

                          {/* Presence and Variation */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Presence in Different Hair Types</h3>
                            <p className="leading-relaxed">
                              Now, a critical technical point: the presence of the medulla is directly correlated with hair thickness and coarseness. It's usually found in terminal hairs – which are the thicker hairs on the scalp, eyebrows, and eyelashes. It's typically more prominent in hair from individuals of African and Asian descent. In contrast, vellus hair—the fine, downy hair on the body—and very fine or blonde hair often lack a medulla, or if present, it might be very discontinuous and fragmented. It's like having different models of hair and some models have this extra feature and some don't.
                            </p>
                          </div>

                          {/* Function and Debate */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Debated Functions</h3>
                            <p className="leading-relaxed">
                              The precise functional role of the medulla continues to be debated within the scientific community. Its porous structure with the trapped air spaces have led to theories suggesting a possible role in thermal insulation. The idea is that the air-filled spaces could help regulate heat transfer, maintaining warmth in colder conditions and cooling in warmer conditions. However, because it's absent in many hair types, it's clear that the medulla isn't essential for this function, and there is another theory that it helps to give the hair more flexibility. It is thought to work as a shock absorber which allows for the hair to bend more freely. However, as stated before, it is not fully understood.
                            </p>
                          </div>

                          {/* Professional Perspective */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Professional Implications</h3>
                            <p className="leading-relaxed">
                              From a professional perspective, we rarely interact directly with the medulla. Our chemical processes—like perming, coloring, or relaxing—primarily target the cortex and the cuticle, where the most significant structural changes occur. However, while we don't actively treat the medulla, it's crucial for us as stylists to have a comprehensive understanding of the entire hair structure. Knowing that the medulla is a porous area, it may help us understand why some hairs are more absorbent than others. It is important to us to fully understand our craft.
                            </p>
                          </div>

                          {/* Hair Type Properties */}
                          <div className="space-y-4">
                            <p className="leading-relaxed">
                              The medulla also contributes to the unique properties of different hair types. The presence or absence of the medulla, its size, and its arrangement help explain why coarse, thick hair behaves differently than fine, thin hair. It's just another puzzle piece of the complex nature of the human hair. When we understand these differences it helps us to be more professional and knowledgeable in our craft.
                            </p>
                          </div>

                          {/* Conclusion */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Summary</h3>
                            <p className="leading-relaxed">
                              In summary, the medulla is the innermost core of the hair, characterized by its loosely structured, partially keratinized cells, and air-filled vacuoles. It's not always present, it's more common in thicker, coarser hairs, and it may contribute to insulation and flexibility. While we don't directly treat it, understanding its unique structure and its variability is essential for building our knowledge as hair professionals. The medulla highlights that the more you know about hair, the better you are as a professional.
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedContent === 'Eumelanin Content' && (
                        <div className="space-y-8">
                          {/* Introduction */}
                          <div className="space-y-4">
                            <p className="text-lg leading-relaxed">
                              Let's dive into the complex world of eumelanin, the pigment at the heart of black and brown hair shades. Eumelanin is a biopolymer, meaning it's a large molecule constructed from repeating units, formed through a complex process called melanogenesis. This process starts with the amino acid tyrosine, which undergoes a series of enzymatic reactions within specialized cells called melanocytes, located in the hair follicle bulb. Key enzymes, like tyrosinase, are crucial for these reactions, and any disruptions can alter the amount or type of melanin produced. It's not just a single reaction, but a cascade of them, all precisely regulated.
                            </p>
                          </div>

                          {/* Types and Structure */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Types and Chemical Structure</h3>
                            <p className="leading-relaxed">
                              Eumelanin exists in two main forms, each with distinct chemical structures and light-absorbing properties: black eumelanin and brown eumelanin. Black eumelanin contains a higher degree of polymerization and cross-linking, which is what gives it its darker appearance and is very stable. This is why it absorbs most wavelengths of light and appears black. Brown eumelanin has a less cross-linked structure, absorbing light less intensely and reflecting it differently, creating a range of brown shades. The exact ratio of black to brown eumelanin, and their overall concentration, dictates the hair's specific shade of black or brown. It's not just about having eumelanin, but how much and what type are present. The melanin granules are also a very specific shape, and when packed densely it creates a deeper, darker hue.
                            </p>
                          </div>

                          {/* Molecular Stability */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Molecular Stability</h3>
                            <p className="leading-relaxed">
                              Technically, eumelanin is incredibly stable, due to its complex and highly cross-linked molecular structure, where the individual units are interconnected in multiple places. These cross-links make eumelanin resistant to chemical breakdown, including oxidizers and reductants. This is why lightening darker hair is such a significant challenge, as it requires very potent oxidizing agents to break down the complex molecular structure of eumelanin. It requires a multi-step process to ensure the hair is not damaged.
                            </p>
                          </div>

                          {/* Professional Applications */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Professional Applications</h3>
                            <p className="leading-relaxed">
                              For a hair professional, a deep understanding of eumelanin is not just beneficial but crucial. When formulating a color, we are essentially working around the presence and concentration of eumelanin, and trying to either remove it or change it. When using oxidative hair color, the synthetic pigments that we deposit interact with and attempt to replicate the natural tones of eumelanin. That is why understanding where the pigment is on the color scale is crucial for the right formulation. Understanding that some hair is more difficult to lift than other helps to manage expectations. Also, our lightening processes are specifically designed to disrupt the intricate cross-linked structure of eumelanin, breaking it down to lighter fragments. When we work with highlights we need to understand that every level up we are taking away different tones of eumelanin.
                            </p>
                          </div>

                          {/* Protective Function */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Natural Protection</h3>
                            <p className="leading-relaxed">
                              Beyond coloring, eumelanin plays an important role as a natural sunscreen, absorbing UV radiation and protecting the scalp. This explains why people with darker hair are more resistant to sun damage. Understanding the protective function of eumelanin can influence your recommendations for hair and scalp care for clients.
                            </p>
                          </div>

                          {/* Conclusion */}
                          <div className="space-y-4">
                            <p className="leading-relaxed">
                              In summary, eumelanin is more than just a dark pigment; it's a complex molecular system with varied forms, distinct light-absorbing properties, and a protective role. A professional needs to grasp the nuances of this pigment to effectively manipulate hair color and ensure healthy outcomes.
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedContent === 'Trichosiderin Content' && (
                        <div className="space-y-8">
                          {/* Introduction */}
                          <div className="space-y-4">
                            <p className="text-lg leading-relaxed">
                              Let's now dissect trichosiderin, the iron-containing pigment responsible for red tones in the hair and feathers of certain animals. Trichosiderin's structure is distinctly different from melanins. It is not a biopolymer; instead, it's a metalloprotein, meaning it's a complex molecule where iron is tightly bound to other organic compounds—amino acids and peptides— through coordination bonds. The exact nature of these compounds can vary, contributing to slight variations in color intensity and stability.
                            </p>
                          </div>

                          {/* Chemical Properties */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Chemical Properties</h3>
                            <p className="leading-relaxed">
                              Technically, the color of trichosiderin is due to its iron content, which selectively absorbs most wavelengths of visible light except for those in the red spectrum, which it reflects back. This selective absorption arises from the electronic transitions within the iron complex itself, a concept known as ligand field theory. The iron atoms are in specific coordination states, that affect what color we will see. Because of the iron it is very reactive to other substances, it can easily change color if exposed to oxidizers, reducers and light.
                            </p>
                          </div>

                          {/* Stability Characteristics */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Stability and Degradation</h3>
                            <p className="leading-relaxed">
                              The stability of trichosiderin is quite low compared to eumelanin, as the bonds holding the iron are relatively weak. Exposure to ultraviolet radiation and oxidation readily causes the iron complex to degrade, leading to fading or dulling of color. This is the reason why animal hairs can change color with too much sun exposure. This is especially true of red hairs where the pigments are more reactive.
                            </p>
                          </div>

                          {/* Professional Applications */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Professional Implications</h3>
                            <p className="leading-relaxed">
                              For a hair professional working with animal hair, understanding the chemical lability of trichosiderin is very important. When attempting to color or style animal hairs you must understand that the red tones will be easily faded if exposed to oxygen and light. Also, their structure may be different, and they may have a different PH level from human hairs.
                            </p>
                          </div>

                          {/* Conclusion */}
                          <div className="space-y-4">
                            <p className="leading-relaxed">
                              Although trichosiderin is absent in human hair, understanding its complex chemical structure, its instability, and the mechanisms through which it creates red coloration can broaden the understanding of pigment behavior. It highlights that while humans rely on melanins for hair color, nature has a vast palette of pigment chemistry. This knowledge is valuable for building a full understanding of hair and pigments.
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedContent === 'Pheomelanin Content' && (
                        <div className="space-y-8">
                          {/* Introduction */}
                          <div className="space-y-4">
                            <p className="text-lg leading-relaxed">
                              Let's explore pheomelanin, the pigment responsible for red and blonde hair tones, with a very technical focus on its molecular structure, synthesis, and behavior. Pheomelanin is also a biopolymer, derived from tyrosine like eumelanin, but it incorporates cysteine, a sulfur-containing amino acid, into its structure. This incorporation of sulfur is what gives pheomelanin its unique reddish-yellow hue and contributes to its distinct chemical properties.
                            </p>
                          </div>

                          {/* Structure and Properties */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Structure and Properties</h3>
                            <p className="leading-relaxed">
                              Pheomelanin exists as smaller, more diffuse granules than eumelanin, and these granules also have a lower concentration within the cortex. The lower the concentration, the lighter the shade. The sulfur-containing component in pheomelanin makes it more prone to oxidation and degradation from chemical treatments and UV light. The incorporation of cysteine also influences the way pheomelanin interacts with the light, creating a less light absorbent, more reflective molecule. This also changes the way it is broken down and lifted when using chemical treatments.
                            </p>
                          </div>

                          {/* Chemical Stability */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Chemical Stability</h3>
                            <p className="leading-relaxed">
                              From a chemical perspective, the sulfur bonds in pheomelanin are less stable than the carbon-carbon bonds in eumelanin, which makes them easier to break. The instability of pheomelanin is a crucial point for hair professionals to consider. Red and blonde hair tends to be more sensitive because the pheomelanin is not as strong as eumelanin. That is why red colors fade faster and they tend to turn to orange when they are being oxidized.
                            </p>
                          </div>

                          {/* Professional Applications */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Professional Applications</h3>
                            <p className="leading-relaxed">
                              As hair professionals, our understanding of pheomelanin directly influences our approach to hair coloring and lightening. The more pheomelanin in the hair the redder it will appear. This will determine how we formulate the color and what type of developer we should use. When we are trying to create a blonde look we have to understand that we need to take out both the pheomelanin and the eumelanin. When you are lightening hair the red tones will need more care since they are more sensitive. That is why some hair tends to be more orange than others because of the undertones of the pheomelanin.
                            </p>
                          </div>

                          {/* Conclusion */}
                          <div className="space-y-4">
                            <p className="leading-relaxed">
                              In summary, pheomelanin's distinct chemical composition and lower stability make it a challenging pigment to work with. However, understanding its nuances is crucial for achieving predictable and satisfying results when dealing with red and blonde hair tones. Understanding the science behind pheomelanin will help any stylist to fully understand coloring processes.
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedContent === 'Texture Content' && (
                        <div className="space-y-8">
                          {/* Introduction */}
                          <div className="space-y-4">
                            <p className="text-lg leading-relaxed">
                              Let's truly dissect hair texture, moving beyond just 'fine, medium, or coarse.' Texture, at its core, refers to the diameter of an individual hair strand. It's not just about how the hair feels but, more importantly, how it behaves and interacts with products and styling techniques. Technically, texture is determined by the size and shape of the hair follicle as well as the overall organization of the keratin proteins within the cortex.
                            </p>
                          </div>

                          {/* Fine Hair */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Fine Hair</h3>
                            <p className="leading-relaxed">
                              Fine hair (often under 0.05mm in diameter) has a smaller cross-sectional area, meaning it's less dense in the cortex. This smaller size impacts the structure of the medulla, which can sometimes be absent in this type of hair. With fewer cuticle layers, it's highly prone to moisture loss and is more susceptible to damage. The result is hair that tends to be less resistant to heat and chemical treatments, requires very specific product choices to avoid weighing it down, and can easily become oily or limp.
                            </p>
                          </div>

                          {/* Medium Hair */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Medium Hair</h3>
                            <p className="leading-relaxed">
                              Medium hair (0.05mm to 0.07mm in diameter) represents a balance. It has a moderate cortex, a decent number of cuticle layers, and a generally well-formed structure. It's neither as fragile as fine hair nor as resistant as coarse hair, making it versatile and easier to style. However, even with medium hair, the variations in the cortex structure will dictate how well the hair responds to styling and products.
                            </p>
                          </div>

                          {/* Coarse Hair */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Coarse Hair</h3>
                            <p className="leading-relaxed">
                              Coarse hair (over 0.07mm in diameter) has a larger cross-sectional area with a densely packed cortex and multiple cuticle layers. This makes it incredibly strong and resilient, often appearing thicker and fuller. Coarse hair tends to have a more substantial medulla, contributing to its robustness and resistance to damage. However, its multiple cuticle layers and dense structure also mean it can be more difficult to treat, less able to absorb moisture, and more prone to dryness. It is more resistant to chemical treatments and will require higher heat for styling.
                            </p>
                          </div>

                          {/* Professional Perspective */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Professional Applications</h3>
                            <p className="leading-relaxed">
                              From a professional perspective, understanding the nuances of texture is paramount. When choosing hair care and styling products, it's not enough to just grab something labelled for 'fine' or 'coarse' hair. You have to analyze the hair strand to see if it's truly fine, medium, or coarse and if there are variations. Our styling choices also depend on texture – for instance, knowing that fine hair will struggle to hold a curl, may influence your techniques when creating an updo. Our cutting techniques also vary depending on the texture of the hair, since fine hair will not bounce in the same way as a coarse hair.
                            </p>
                          </div>

                          {/* Conclusion */}
                          <div className="space-y-4">
                            <p className="leading-relaxed">
                              In summary, hair texture is a complex interplay of diameter, cortex density, cuticle layers, and overall structure. It dictates the hair's inherent behavior and its reaction to our interventions, making it a cornerstone of informed professional practice.
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedContent === 'Porosity Content' && (
                        <div className="space-y-8">
                          {/* Introduction */}
                          <div className="space-y-4">
                            <p className="text-lg leading-relaxed">
                              Let's delve into the intricate details of hair porosity, moving beyond simple descriptions of 'low, average, or high' absorbency. Porosity refers to the hair's capacity to absorb and retain moisture, primarily determined by the condition of the cuticle. But, it's more than that. It's about the integrity of those cuticle layers, the gaps between them, and their ability to both allow moisture in and prevent it from escaping.
                            </p>
                          </div>

                          {/* Low Porosity */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Low Porosity Hair</h3>
                            <p className="leading-relaxed">
                              Technically, porosity levels are a result of the condition of the cuticle scales. In low porosity hair, the cuticle is tightly compacted with overlapping scales that lie flat against the hair shaft. This tight formation creates a very smooth surface, making it difficult for water molecules to penetrate. This hair often feels smooth and looks shiny, but it may struggle to absorb hair products. It needs gentle products that will not sit on the hair but rather go into the hair.
                            </p>
                          </div>

                          {/* Average Porosity */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Average Porosity Hair</h3>
                            <p className="leading-relaxed">
                              Average porosity hair has a moderately open cuticle, where the scales are more relaxed and slightly raised, allowing moisture to move in and out at a more balanced rate. This is considered the most versatile and easiest to manage hair type. It absorbs moisture well and retains it for a decent amount of time, with fewer problems holding a style.
                            </p>
                          </div>

                          {/* High Porosity */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">High Porosity Hair</h3>
                            <p className="leading-relaxed">
                              High porosity hair has a damaged or lifted cuticle, where the scales are widely separated, creating gaps and openings. This allows moisture to be rapidly absorbed, but also readily lost. High porosity hair often feels dry, rough, and brittle, tends to absorb too much product, and is prone to frizz. This type of hair needs products that will seal the hair cuticle and prevent the loss of moisture.
                            </p>
                          </div>

                          {/* Professional Perspective */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Professional Applications</h3>
                            <p className="leading-relaxed">
                              From a professional perspective, understanding porosity is essential because it dictates how effectively treatments penetrate the hair shaft. For low porosity hair, we must select products with smaller molecules that are more easily absorbed, and consider heat to help open up the cuticle. High porosity hair, on the other hand, requires protein-based treatments to fill in the gaps, seal the cuticle, and enhance moisture retention, and we need to be more careful with chemical processes to avoid further damage. Also when we are coloring, high porosity hair may absorb the color quicker and we need to ensure we are formulating carefully.
                            </p>
                          </div>

                          {/* Environmental Factors */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Environmental Impact</h3>
                            <p className="leading-relaxed">
                              The environment also affects porosity. Humidity can cause high porosity hair to become frizzy, while hard water can leave residue on low porosity hair and cause build up. Also, high heat will damage hair over time and increase the porosity. Understanding how to manage those factors is important to our craft.
                            </p>
                          </div>

                          {/* Conclusion */}
                          <div className="space-y-4">
                            <p className="leading-relaxed">
                              In summary, hair porosity is not just about how much water is absorbed, but the underlying structure of the cuticle, how open or closed it is, and how that influences moisture exchange. It's a complex interplay that guides our product selection and treatment decisions, and is very important for maintaining healthy, hydrated hair.
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedContent === 'Elasticity Content' && (
                        <div className="space-y-8">
                          {/* Introduction */}
                          <div className="space-y-4">
                            <p className="text-lg leading-relaxed">
                              Now, let's delve deep into hair elasticity, not just as 'stretchiness,' but as a reflection of the cortex's intricate protein structure. Elasticity refers to the hair's capacity to stretch and return to its original length without breaking. It's a measure of the hair's inner strength and resilience, determined by the integrity of the keratin protein network within the cortex.
                            </p>
                          </div>

                          {/* Technical Explanation */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Technical Foundation</h3>
                            <p className="leading-relaxed">
                              Technically, elasticity is a reflection of the state of the peptide and disulfide bonds within the cortex. When hair is stretched, these bonds act like tiny springs, allowing the hair to extend. If the bonds are strong and healthy, the hair returns to its original length. However, damaged bonds result in the hair becoming brittle and prone to breakage.
                            </p>
                          </div>

                          {/* Low Elasticity */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Low Elasticity</h3>
                            <p className="leading-relaxed">
                              Low elasticity indicates a compromised cortex where the peptide and disulfide bonds are weak, often due to damage from over-processing, excessive heat, or nutritional deficiencies. Low elasticity hair feels brittle, breaks easily, and is prone to split ends. There is a limited amount of stretch to this type of hair. This type of hair needs gentle care, and we need to be very cautious when using chemical treatments.
                            </p>
                          </div>

                          {/* Average Elasticity */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Average Elasticity</h3>
                            <p className="leading-relaxed">
                              Average elasticity signifies a healthy cortex with well-formed protein bonds. The hair stretches well and returns to its original length, indicating resilience and balance. This is considered the ideal state for styling, handling, and chemical treatments.
                            </p>
                          </div>

                          {/* High Elasticity */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">High Elasticity</h3>
                            <p className="leading-relaxed">
                              High elasticity signifies an exceptionally healthy cortex with strong protein bonds and sufficient moisture. Hair with high elasticity can stretch considerably and returns back perfectly to its original state, this hair tends to hold a curl very well.
                            </p>
                          </div>

                          {/* Professional Perspective */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Professional Applications</h3>
                            <p className="leading-relaxed">
                              From a professional perspective, elasticity testing is crucial for assessing the health and integrity of the hair. For clients with low elasticity, we need to focus on protein-based treatments to repair and strengthen the cortex, as well as reducing damaging processes like heat or chemical treatments. Hair with good elasticity tends to respond better to our treatments and styling techniques and is an indication of a healthier hair.
                            </p>
                          </div>

                          {/* Styling Impact */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Impact on Styling</h3>
                            <p className="leading-relaxed">
                              Elasticity also impacts our styling techniques, low elasticity hair will not hold a curl or style and may require more products to hold the style, and less heat when doing heat styling. Also, low elasticity hair does not bounce very well and will not have the same shape when cut as hair with high elasticity.
                            </p>
                          </div>

                          {/* Conclusion */}
                          <div className="space-y-4">
                            <p className="leading-relaxed">
                              In summary, hair elasticity is not just about stretch; it's about the health and integrity of the cortex and its protein bonds, that dictates the hair's ability to stretch without damage and determines the overall health and resilience. A proper elasticity test and understanding of its principles will help you make much better decisions in the salon.
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedContent === 'Density Content' && (
                        <div className="space-y-8">
                          {/* Introduction */}
                          <div className="space-y-4">
                            <p className="text-lg leading-relaxed">
                              Finally, let's explore hair density, not just as 'amount' of hair, but as a reflection of the number of active hair follicles per square inch on the scalp. Density is not about the thickness of individual strands but how much hair is growing per unit of area. It's determined by genetic factors and influences the overall appearance and volume of the hair.
                            </p>
                          </div>

                          {/* Technical Foundation */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Technical Foundation</h3>
                            <p className="leading-relaxed">
                              Technically, hair density is a function of the number of hair follicles in the active growth phase (anagen) per unit area of the scalp. Low density hair (often below 100 follicles per square inch) has a thinner appearance and the scalp may be easily visible. This type of hair may struggle to hold a style because it lacks the volume of the other densities.
                            </p>
                          </div>

                          {/* Average Density */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Average Density</h3>
                            <p className="leading-relaxed">
                              Average density hair (around 100-150 follicles per square inch) provides a balanced fullness and is easy to style. There is enough hair to create volume without being too heavy.
                            </p>
                          </div>

                          {/* High Density */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">High Density</h3>
                            <p className="leading-relaxed">
                              High density hair (over 150 follicles per square inch) is thick and voluminous, but also requires specialized styling and treatments because it can be prone to frizz. While having a high density is a good sign of a healthy scalp and hair, it may require more time to dry and more products. It may also be more resistant to styling and coloring and chemical treatments.
                            </p>
                          </div>

                          {/* Professional Applications */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Professional Applications</h3>
                            <p className="leading-relaxed">
                              From a professional perspective, understanding density is key to creating suitable hairstyles and treatments. Low density hair will benefit from layered cuts and volumizing products, as well as blow dry techniques that enhance volume. High density hair needs techniques to reduce bulk and weight, and cuts that promote shape and manageability. The density of the hair will determine how we approach hair cuts and blow dries. Also, low density hair will require less product and chemicals for all types of treatments.
                            </p>
                          </div>

                          {/* Conclusion */}
                          <div className="space-y-4">
                            <p className="leading-relaxed">
                              In short, hair density is not just about the amount of hair on the head but the number of active follicles, and their distribution, and this ultimately influences how the hair appears, its styling possibilities, and our approach to treatment choices. Understanding and evaluating density is an important tool to become a more knowledgeable stylist.
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedContent === 'Amino Acids Content' && (
                        <div className="space-y-8">
                          {/* Introduction */}
                          <div className="space-y-4">
                            <p className="text-lg leading-relaxed">
                              Let's embark on a truly in-depth exploration of amino acids, the foundational molecules of all hair proteins, particularly keratin. Imagine amino acids as the individual Lego bricks that, when connected in specific ways, build all the structures of your hair. They are more than just building blocks; they are sophisticated organic molecules with a central carbon atom, an amino group (-NH2), a carboxyl group (-COOH), and a unique side chain (R-group) all attached to that central carbon. This side chain is where the magic happens, as it dictates the unique properties of each amino acid.
                            </p>
                          </div>

                          {/* Chemical Properties */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Chemical Properties</h3>
                            <p className="leading-relaxed">
                              Technically, these side chains can be categorized based on their interactions with water and their electrical charge. Polar side chains are attracted to water, like a magnet to metal; they are called hydrophilic (water-loving). Nonpolar side chains are repelled by water, like oil to water, and they are called hydrophobic (water-fearing). Acidic side chains have a negative electrical charge at the body's natural pH (around 7), while basic side chains have a positive charge. These charges determine how each amino acid will interact with other parts of the protein chain. These specific charges will dictate how the proteins will fold in space and the properties of that specific protein. The amino acids all work together to form each keratin protein.
                            </p>
                          </div>

                          {/* Key Amino Acids */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Key Amino Acids in Hair</h3>
                            <p className="leading-relaxed">
                              In hair, cysteine is like the superhero amino acid. Its side chain contains sulfur (S), which is essential for creating the disulfide bonds that provide hair with its strength and shape. Other vital amino acids include serine, glutamic acid, arginine, and leucine, and each of them contributes a unique property to the overall protein structure, influencing the texture, elasticity, and strength of hair. These amino acids are connected together forming a long chain which is the polypeptide. The precise sequence, number, and arrangement of these amino acids, is determined by the hair's DNA, and dictate the structure of that particular keratin.
                            </p>
                          </div>

                          {/* Professional Applications */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Professional Applications</h3>
                            <p className="leading-relaxed">
                              From a practical point of view, understanding amino acids gives us great insight on how our chemical treatments work. When we perm or straighten the hair, we are disrupting the way that these specific amino acids are bonded together. When we color the hair, we are adding or removing color molecules that are formed from amino acids.
                            </p>
                          </div>

                          {/* Product Selection */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Product Selection</h3>
                            <p className="leading-relaxed">
                              Also, understanding what types of amino acids make up hair helps us select the right products. For example, products that contain keratin are actually providing our hair with different amino acids that can help in repairing and strengthening damaged hair. It is like giving our hair the right supplements that it needs to heal.
                            </p>
                          </div>

                          {/* Conclusion */}
                          <div className="space-y-4">
                            <p className="leading-relaxed">
                              In summary, amino acids are not just generic building blocks; they are specialized organic molecules with diverse properties that influence hair structure. Understanding the nature of these 'bricks' is key for any stylist that wants to understand their craft.
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedContent === 'Peptide Bonds Content' && (
                        <div className="space-y-8">
                          {/* Introduction */}
                          <div className="space-y-4">
                            <p className="text-lg leading-relaxed">
                              Now, let's explore peptide bonds, the vital connections that create the backbone of hair's protein structure. Imagine peptide bonds as the very strong rivets that join individual amino acid 'bricks' together to form long, sturdy chains. They are covalent bonds, which is a chemical term for sharing electrons between atoms, specifically formed between the carboxyl group (-COOH) of one amino acid and the amino group (-NH2) of the next one. When this bond forms, water is released which is known as a dehydration or condensation reaction.
                            </p>
                          </div>

                          {/* Technical Structure */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Technical Structure</h3>
                            <p className="leading-relaxed">
                              Technically, the peptide bond is planar, which means that the six atoms involved (C, O, N, and H) are all forced to lie on the same flat plane. This restricted structure helps to add stability and rigidity to the protein structure, like a flat board being used as support. Also, the electrons in the peptide bond are delocalized, which is the sharing of electrons between multiple atoms, kind of like a shared current flowing between multiple points of a wire. This makes the bond exceptionally stable, very strong, and hard to break, like a very sturdy bridge that withstands all conditions. This will form the base structure of the protein.
                            </p>
                          </div>

                          {/* Primary Structure */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Primary Structure</h3>
                            <p className="leading-relaxed">
                              The sequence of peptide bonds and the type of amino acid will define the primary structure of the protein, and this is very important because it dictates the function of that specific protein. This polypeptide chain is the backbone, but it does not determine the final 3D shape that we see in the hair, we need other types of bonds for that.
                            </p>
                          </div>

                          {/* Practical Implications */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Practical Implications</h3>
                            <p className="leading-relaxed">
                              From a practical perspective, peptide bonds are so strong that they're not easily broken under normal styling conditions. They are resistant to mild chemical treatments and regular heat, which is why your hair will not simply fall apart. But, harsh chemicals or extreme heat can break these bonds, leading to severe hair damage. This is why it's important to understand the level of damage we are doing to the hair when using chemical processes.
                            </p>
                          </div>

                          {/* Maintenance */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Maintenance</h3>
                            <p className="leading-relaxed">
                              Also, because the polypeptide chain is the base structure of the hair, it is vital to maintain the integrity of the peptide bonds. This is why we need to use products that help to maintain a healthy hair structure, and avoid over processing.
                            </p>
                          </div>

                          {/* Conclusion */}
                          <div className="space-y-4">
                            <p className="leading-relaxed">
                              In summary, peptide bonds are not just simple connections, but are stable and strong covalent bonds, that form the main structure of the polypeptide chain, which is the core of the protein. This structure is very stable and resistant which ensures the integrity of the hair. As hair professionals, we need to respect their strength and understand their vulnerabilities.
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedContent === 'Disulphide Bonds Content' && (
                        <div className="space-y-8">
                          {/* Introduction */}
                          <div className="space-y-4">
                            <p className="text-lg leading-relaxed">
                              Let's now deeply explore disulfide bonds, the strong chemical connections that give hair its unique 3D shape. Disulfide bonds are not just connections between two sulfur atoms; they are powerful covalent links formed through a specific chemical reaction between two cysteine amino acids. These cysteine amino acids contain sulfur (S) atoms in their side chains. When two cysteines are close together in the polypeptide chains, their sulfur atoms can react, sharing electrons to create a strong covalent bond (S-S).
                            </p>
                          </div>

                          {/* Technical Structure */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Technical Structure</h3>
                            <p className="leading-relaxed">
                              Technically, these covalent bonds are cross-links within and between the polypeptide chains of keratin, creating a 3D network that provides both strength and shape. It's like the rungs on a ladder: the polypeptide chains are the sides of the ladder and the disulfide bonds are the rungs holding everything together. This is what gives hair its shape, from straight to coily. The more disulfide bonds, the more curled the hair will be. These bonds also add tensile strength, a term for how much the hair can stretch and withstand forces without breaking.
                            </p>
                          </div>

                          {/* Shape Determination */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Shape Determination</h3>
                            <p className="leading-relaxed">
                              The specific location of the disulfide bonds also determines the overall shape of the hair strand. For example, in curly hair, the disulfide bonds are positioned in a way that creates a bent or curled shape. This position is not random, it is determined by the genetic code of the hair.
                            </p>
                          </div>

                          {/* Chemical Services */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Chemical Services</h3>
                            <p className="leading-relaxed">
                              From a practical standpoint, disulfide bonds are the primary targets of chemical services like perming, relaxing, and some coloring. Our chemical straighteners and perms, use reducing agents—molecules that donate electrons to break down those (S-S) linkages between sulfur atoms. Once the bonds are broken, the hair can be reshaped and then they are reformed by applying oxidizing agents, which will help rebuild the connections between the sulfur atoms in the new shape. It is very important to be careful with those chemicals and to ensure that they are used properly.
                            </p>
                          </div>

                          {/* Heat Impact */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Heat Impact</h3>
                            <p className="leading-relaxed">
                              Also, excessive heat can weaken the disulfide bonds, leading to fragile and damaged hair with split ends. This is why heat protectants are so important, as they provide a protective barrier to the hair and reduce the damage from excessive heat.
                            </p>
                          </div>

                          {/* Conclusion */}
                          <div className="space-y-4">
                            <p className="leading-relaxed">
                              In summary, disulfide bonds are not just connections, but are robust cross-links that create the 3D structure of the hair, impacting its strength, shape and curl pattern. Understanding the science behind how these bonds can be manipulated is vital to performing chemical services effectively and safely.
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedContent === 'Hydrogen Bonds Content' && (
                        <div className="space-y-8">
                          {/* Introduction */}
                          <div className="space-y-4">
                            <p className="text-lg leading-relaxed">
                              Finally, let's examine hydrogen bonds, the temporary connections that allow us to style and shape hair without permanently altering its structure. Imagine hydrogen bonds as weak, temporary magnets that link different parts of the keratin molecules together, allowing for flexible adjustments in the hair shape. These bonds are not covalent, but rather they are a type of intermolecular force, meaning they are between molecules.
                            </p>
                          </div>

                          {/* Technical Structure */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Technical Structure</h3>
                            <p className="leading-relaxed">
                              Technically, a hydrogen bond forms when a hydrogen atom, which is covalently linked to a highly electronegative atom like oxygen or nitrogen, is attracted to another electronegative atom elsewhere. These bonds are weak and easily broken by water or heat because they are intermolecular, meaning they are bonds between different molecules instead of within the same molecule.
                            </p>
                          </div>

                          {/* Hair Flexibility */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Hair Flexibility</h3>
                            <p className="leading-relaxed">
                              The flexibility of the hair is because of hydrogen bonds. When hair is wet, water molecules disrupt the existing hydrogen bonds, making the hair more malleable and easier to manipulate. Then, as the hair dries, new hydrogen bonds are formed in the new shape that you've given to the hair. This is how setting, and wet styling works. When we heat hair, we are adding energy to break the existing hydrogen bonds so that they can reform in a new shape as the hair cools.
                            </p>
                          </div>

                          {/* Styling Applications */}
                          <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-pink-600">Styling Applications</h3>
                            <p className="leading-relaxed">
                              From a practical point of view, understanding hydrogen bonds is key to our styling techniques. Our use of styling tools (blow dryers, curling irons, hair setters, etc) is based on breaking and reforming hydrogen bonds. The products we use can influence these hydrogen bonds by creating more of them to ensure that the style lasts longer. When we blow dry the hair, for example, we are creating hydrogen bonds so the style can stay.
                            </p>
                          </div>

                          {/* Style Longevity */}
                          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                            <h3 className="text-xl font-semibold text-gray-700">Style Longevity</h3>
                            <p className="leading-relaxed">
                              However, because the hydrogen bonds are easy to break, that is why the style is not permanent. The presence of humidity or water can disrupt the hydrogen bonds, making the hair revert to its original shape.
                            </p>
                          </div>

                          {/* Conclusion */}
                          <div className="space-y-4">
                            <p className="leading-relaxed">
                              In summary, hydrogen bonds are not just random interactions, but weak forces that are easy to break with heat and water and are responsible for hair's temporary shaping. They allow us to create temporary styles without permanently altering the hair's structure, and they are key to our craft.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Navigation Bar */}
                  <div className="mt-8 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <a
                        href="/beginner"
                        className="inline-flex items-center px-4 py-2 text-pink-600 hover:text-pink-700 font-semibold"
                      >
                        <svg 
                          className="w-5 h-5 mr-2" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M15 19l-7-7 7-7" 
                          />
                        </svg>
                        Back to Chapters
                      </a>
                      
                      <button
                        onClick={handleNextTopic}
                        disabled={!findNextTopic(selectedContent)}
                        className={`inline-flex items-center px-4 py-2 font-semibold rounded-md transition-colors
                          ${findNextTopic(selectedContent)
                            ? 'text-pink-600 hover:text-pink-700'
                            : 'text-gray-400 cursor-not-allowed'
                          }`}
                      >
                        Next Topic
                        <svg 
                          className="w-5 h-5 ml-2" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
