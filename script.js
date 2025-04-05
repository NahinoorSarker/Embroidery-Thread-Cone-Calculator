let currentLanguage = 'bn';
const translations = {
    bn: {
        title: "এমব্রয়ডারি সুতা কোণ ক্যালকুলেটর",
        singleColor: "একক রঙ",
        multiColor: "একাধিক রঙ",
        calculate: "হিসাব করুন",
        addColor: "রঙ যোগ করুন",
        stitches: "স্টিচ সংখ্যা",
        pieces: "উৎপাদন সংখ্যা",
        stitchLength: "স্টিচ দৈর্ঘ্য",
        coneLength: "কোণ দৈর্ঘ্য",
        waste: "অপচয়",
        threadType: "সুতার ধরন",
        resultTitle: "ফলাফল",
        total: "মোট",
        requiredCones: "প্রয়োজনীয় কোণ",
        totalStitches: "মোট স্টিচ",
        totalCones: "মোট কোণ",
        colorCount: "রঙের সংখ্যা",
        multiPieces: "উৎপাদন সংখ্যা",
        multiStitchLength: "স্টিচ দৈর্ঘ্য",
        multiConeLength: "কোণ দৈর্ঘ্য",
        multiWaste: "অপচয়"
        
    },
    en: {
        title: "Embroidery Thread Cone Calculator",
        singleColor: "Single Color",
        multiColor: "Multiple Colors",
        calculate: "Calculate",
        addColor: "Add Color",
        stitches: "Stitch Count",
        pieces: "Production Quantity",
        stitchLength: "Stitch Length",
        coneLength: "Cone Length",
        waste: "Waste",
        threadType: "Thread Type",
        resultTitle: "Result",
        total: "Total",
        requiredCones: "Required Cones",
        totalStitches: "Total stitches",
        totalCones: "Total cones",
        colorCount: "Number of colors",
        multiPieces: "Production Quantity",
        multiStitchLength: "Stitch Length",
        multiConeLength: "Cone Length",
        multiWaste: "Waste"
    }
};

// Language Toggle
document.getElementById('language-toggle').addEventListener('change', function() {
    currentLanguage = this.checked ? 'en' : 'bn';
    updateUI();
});

// Initialize UI
function updateUI() {
    document.getElementById('title').textContent = translations[currentLanguage].title;
    document.getElementById('singleColorBtn').textContent = translations[currentLanguage].singleColor;
    document.getElementById('multiColorBtn').textContent = translations[currentLanguage].multiColor;
    document.getElementById('calculateSingleBtn').textContent = translations[currentLanguage].calculate;
    document.getElementById('addColorBtn').textContent = translations[currentLanguage].addColor;
    document.getElementById('calculateMultiBtn').textContent = translations[currentLanguage].calculate;

    // Update placeholders for single color form
    document.getElementById('stitches').placeholder = translations[currentLanguage].stitches;
    document.getElementById('pieces').placeholder = translations[currentLanguage].pieces;
    document.getElementById('stitchLength').placeholder = translations[currentLanguage].stitchLength;
    document.getElementById('coneLength').placeholder = translations[currentLanguage].coneLength;
    document.getElementById('waste').placeholder = translations[currentLanguage].waste;

    // Update placeholders for multi-color form
    document.getElementById('colorCount').placeholder = translations[currentLanguage].colorCount;
    document.getElementById('multiPieces').placeholder = translations[currentLanguage].multiPieces;
    document.getElementById('multiStitchLength').placeholder = translations[currentLanguage].multiStitchLength;
    document.getElementById('multiConeLength').placeholder = translations[currentLanguage].multiConeLength;
    document.getElementById('multiWaste').placeholder = translations[currentLanguage].multiWaste;

    // Update dynamically created color inputs
    updateDynamicPlaceholders();
}

function updateDynamicPlaceholders() {
    const colorNames = document.querySelectorAll('.color-name');
    const colorStitches = document.querySelectorAll('.color-stitches');

    colorNames.forEach((input, index) => {
        input.placeholder = `${translations[currentLanguage].threadType} ${index + 1}`;
    });

    colorStitches.forEach(input => {
        input.placeholder = translations[currentLanguage].stitches;
    });
}



// Form Handling
function setDesignType(type) {
    document.getElementById('singleColorForm').classList.add('hidden');
    document.getElementById('multiColorForm').classList.add('hidden');
    document.getElementById(`${type}ColorForm`).classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
}

// Add Color Inputs
function addColorInputs() {
    const count = parseInt(document.getElementById('colorCount').value);
    const container = document.getElementById('colorInputs');
    container.innerHTML = ''; // Clear previous inputs

    for (let i = 0; i < count; i++) {
        container.innerHTML += `
            <input type="text" class="color-name" placeholder="${translations[currentLanguage].threadType} ${i + 1}">
            <input type="number" class="color-stitches" placeholder="${translations[currentLanguage].stitches}">
        `;
    }
}


// Calculation Logic
function calculateCones(stitches, pieces, stitchLength, coneLength, waste, threadFactor) {
    const totalThread = stitches * (stitchLength/1000) * pieces * (1 + waste/100) * threadFactor;
    return Math.ceil(totalThread / coneLength);
}

// Single Color Calculation
function calculateSingle() {
    const inputs = {
        stitches: parseInt(document.getElementById('stitches').value),
        pieces: parseInt(document.getElementById('pieces').value),
        stitchLength: parseFloat(document.getElementById('stitchLength').value) || 2.5,
        coneLength: parseFloat(document.getElementById('coneLength').value) || 3000,
        waste: parseFloat(document.getElementById('waste').value) || 15,
        threadType: document.getElementById('threadType').value
    };

    const factors = { '30wt': 1.2, '40wt': 1.0, '60wt': 0.8 };
    const cones = calculateCones(
        inputs.stitches,
        inputs.pieces,
        inputs.stitchLength,
        inputs.coneLength,
        inputs.waste,
        factors[inputs.threadType]
    );

    showResult(`
        <h3>${translations[currentLanguage].resultTitle}</h3>
        <p>${translations[currentLanguage].stitches}: ${inputs.stitches}</p>
        <p>${translations[currentLanguage].pieces}: ${inputs.pieces}</p>
        <p>${translations[currentLanguage].requiredCones}: ${cones}</p>
    `);
}

// Multi Color Calculation
function calculateMulti() {
    const inputs = {
        pieces: parseInt(document.getElementById('multiPieces').value),
        stitchLength: parseFloat(document.getElementById('multiStitchLength').value) || 2.5,
        coneLength: parseFloat(document.getElementById('multiConeLength').value) || 3000,
        waste: parseFloat(document.getElementById('multiWaste').value) || 15,
        multithreadType: document.getElementById('multithreadType').value
    };

    let totalCones = 0;
    let totalStitches = 0; // মোট স্টিচ সংখ্যা ট্র্যাক করার জন্য ভেরিয়েবল
    let resultHTML = `<h3>${translations[currentLanguage].resultTitle}</h3>`;
    
    const colorInputs = document.querySelectorAll('#colorInputs > input');
    
    for (let i = 0; i < colorInputs.length; i += 2) {
        const color = colorInputs[i].value;
        const stitches = parseInt(colorInputs[i + 1].value);

        if (!stitches || stitches <= 0) continue; // যদি স্টিচ সংখ্যা সঠিক না হয়, সেটি বাদ দিন

        const factors = { '30wt': 1.2, '40wt': 1.0, '60wt': 0.8 };
        const cones = calculateCones(
            stitches,
            inputs.pieces,
            inputs.stitchLength,
            inputs.coneLength,
            inputs.waste,
            factors[inputs.multithreadType] // ডিফল্ট থ্রেড টাইপ ধরে নেওয়া হয়েছে
        );

        totalCones += cones;
        totalStitches += stitches; // মোট স্টিচ সংখ্যা যোগ করুন

        resultHTML += `
            <p><strong>${color}:</strong></p>
            <p>${translations[currentLanguage].stitches}: ${stitches}</p>
            <p>${translations[currentLanguage].requiredCones}: ${cones}</p>
        `;
    }

    // মোট স্টিচ এবং মোট কোণ যোগ করুন
    resultHTML += `
        <h4>${translations[currentLanguage].totalStitches}: ${totalStitches}</h4>
        <h4>${translations[currentLanguage].totalCones}: ${totalCones}</h4>
    `;

    showResult(resultHTML);
}

function showResult(content) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = content;
    resultDiv.classList.remove('hidden');
}

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});
