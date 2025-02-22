// script.js
let currentDesignType = '';

let currentLanguage = 'en';

const translations = {

    bn: {

        title: "এমব্রয়ডারি সুতা কোণ ক্যালকুলেটর",
        title2: "এমব্রয়ডারি সুতা কোণ ক্যালকুলেটর",

        singleColor: "সিঙ্গেল কালার",

        multiColor: "মাল্টি কালার",

        stitches: "মোট স্টিচ সংখ্যা",

        pieces: "উৎপাদন পরিমাণ",

        stitchLength: "স্টিচ দৈর্ঘ্য (mm)",

        coneLength: "কোণের দৈর্ঘ্য (মিটার)",

        waste: "অপচয় শতাংশ (ডিফল্ট 15%)",

        calculate: "হিসাব করুন",

        addColor: "রঙ যোগ করুন",

        colorCount: "রঙের সংখ্যা",

        color: "রঙ",

        standard: "স্ট্যান্ডার্ড",

        thick: "মোটা",

        thin: "সূক্ষ্ম",

        requiredCones: "প্রয়োজনীয় কোণ সংখ্যা",

        total: "মোট"

    },

    en: {

        title: "Embroidery Thread Cone Calculator",
        title2: "Embroidery Thread Cone Calculator",

        singleColor: "Single Color",

        multiColor: "Multi Color",

        stitches: "Total Stitch Count",

        pieces: "Production Quantity",

        stitchLength: "Stitch Length (mm)",

        coneLength: "Cone Length (meters)",

        waste: "Waste Percentage (Default 15%)",

        calculate: "Calculate",

        addColor: "Add Color",

        colorCount: "Number of Colors",

        color: "Color",

        standard: "Standard",

        thick: "Thick",

        thin: "Thin",

        requiredCones: "Required Cones",

        total: "Total"



    }
};

function changeLanguage() {

    const languageToggle = document.getElementById('language-toggle');
    currentLanguage = languageToggle.checked ? 'en' : 'bn';
    
    // এখানে title এর অনুবাদ যোগ করা হয়েছে
    document.getElementById('title').textContent = translations[currentLanguage].title;
    document.getElementById('title2').textContent = translations[currentLanguage].title2;
    
    // বাকি অনুবাদগুলি আগের মতোই রয়েছে
    document.getElementById('singleColorBtn').textContent = translations[currentLanguage].singleColor;
    document.getElementById('multiColorBtn').textContent = translations[currentLanguage].multiColor;

    document.getElementById('stitches').placeholder = translations[currentLanguage].stitches;

    document.getElementById('pieces').placeholder = translations[currentLanguage].pieces;

    document.getElementById('stitchLength').placeholder = translations[currentLanguage].stitchLength;

    document.getElementById('coneLength').placeholder = translations[currentLanguage].coneLength;

    document.getElementById('waste').placeholder = translations[currentLanguage].waste;

    document.getElementById('calculateSingleBtn').textContent = translations[currentLanguage].calculate;

    document.getElementById('colorCount').placeholder = translations[currentLanguage].colorCount;

    document.getElementById('multiPieces').placeholder = translations[currentLanguage].pieces;

    document.getElementById('multiStitchLength').placeholder = translations[currentLanguage].stitchLength;

    document.getElementById('multiConeLength').placeholder = translations[currentLanguage].coneLength;

    document.getElementById('multiWaste').placeholder = translations[currentLanguage].waste;

    document.getElementById('addColorBtn').textContent = translations[currentLanguage].addColor;

    document.getElementById('calculateMultiBtn').textContent = translations[currentLanguage].calculate;

    updateThreadTypeOptions();
    const resultDiv = document.getElementById('result');
    if (!resultDiv.classList.contains('hidden')) {
        if (currentDesignType === 'single') {
            calculateSingle();
        } else if (currentDesignType === 'multi') {
            calculateMulti();
        }
    }


}



function updateThreadTypeOptions() {

    const threadTypes = document.querySelectorAll('select');

    threadTypes.forEach(select => {

        select.options[0].text = `40wt (${translations[currentLanguage].standard})`;

        select.options[1].text = `30wt (${translations[currentLanguage].thick})`;

        select.options[2].text = `60wt (${translations[currentLanguage].thin})`;

    });

}

function setDesignType(type) {

    currentDesignType = type;

    document.getElementById('singleColorForm').classList.add('hidden');

    document.getElementById('multiColorForm').classList.add('hidden');

    document.getElementById(`${type}ColorForm`).classList.remove('hidden');

    document.getElementById('result').classList.add('hidden');

}



function calculateSingle() {

    const stitches = parseInt(document.getElementById('stitches').value);

    const pieces = parseInt(document.getElementById('pieces').value);

    const stitchLength = parseFloat(document.getElementById('stitchLength').value) || 2.5;

    const coneLength = parseFloat(document.getElementById('coneLength').value) || 300;

    const waste = parseFloat(document.getElementById('waste').value) || 15;

    const threadType = document.getElementById('threadType').value;

    const cones = calculateCones(stitches, pieces, waste, threadType, stitchLength, coneLength);

    displayResult(`${translations[currentLanguage].requiredCones}: ${cones}`);

}



function addColorInputs() {

    const colorCount = parseInt(document.getElementById('colorCount').value);

    const colorInputs = document.getElementById('colorInputs');

    colorInputs.innerHTML = '';

    for (let i = 0; i < colorCount; i++) {

        colorInputs.innerHTML += `
            
                ${translations[currentLanguage].color} ${i + 1}:
                
            

            
                ${translations[currentLanguage].stitches}
            

            
                40wt (${translations[currentLanguage].standard})
                30wt (${translations[currentLanguage].thick})
                60wt (${translations[currentLanguage].thin})
            
        `;

    }

}

function calculateMulti() {

    const colorCount = parseInt(document.getElementById('colorCount').value);

    const pieces = parseInt(document.getElementById('multiPieces').value);

    const stitchLength = parseFloat(document.getElementById('multiStitchLength').value) || 2.5;

    const coneLength = parseFloat(document.getElementById('multiConeLength').value) || 300;

    const waste = parseFloat(document.getElementById('multiWaste').value) || 15;

    let result = '';

    let totalCones = 0;

    for (let i = 0; i < colorCount; i++) {

        const color = document.getElementById(`color${i}`).value;

        const stitches = parseInt(document.getElementById(`stitches${i}`).value);

        const threadType = document.getElementById(`threadType${i}`).value;

        const cones = calculateCones(stitches, pieces, waste, threadType, stitchLength, coneLength);

        result += `${color}: ${cones} ${translations[currentLanguage].requiredCones}
`;

        totalCones += cones;

    }

    result += `${translations[currentLanguage].total}: ${totalCones} ${translations[currentLanguage].requiredCones}`;

    displayResult(result);

}



function calculateCones(stitches, pieces, waste, threadType, stitchLength, coneLength) {

    const stitchLengthMeters = stitchLength / 1000; // Convert mm to meters

    const wasteFactor = 1 + (waste / 100);

    const threadFactors = {

        '30wt': 1.2,

        '40wt': 1.0,

        '60wt': 0.8

    };

    const factor = threadFactors[threadType] || 1.0;

    const totalThread = stitches * stitchLengthMeters * pieces * wasteFactor * factor;

    return Math.ceil(totalThread / coneLength);

}



function displayResult(message) {

    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = message;

    resultDiv.classList.remove('hidden');

}



document.getElementById('language-toggle').addEventListener('change', changeLanguage);

// Initialize the page with Bangla language

document.getElementById('language-toggle').checked = true;

changeLanguage();
