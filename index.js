// Worker code for a single, dynamic certificate page generator
// This worker will listen for requests to /certificate/:id
// and generate a unique HTML page for Facebook's scraper.

const CERTIFICATES = {
    // Map your certificate IDs to their unique data
    // You will need to populate this object with your actual data
    '1bg': {
        title: 'Пример',
        image: 'https://lh3.googleusercontent.com/d/1HOXycJVps2g04e3wa70Y7x1yCpNS-V5c=w1000',
        description: 'Спечелих сертификат "Пример" на Слот Игра Еду!'
    },
    '2bg': {
        title: 'Информатика 6 клас',
        image: 'https://lh3.googleusercontent.com/d/1Q5j_tn5uoqYZcqpOs0AX8FB70GL8FKnK=w1000',
        description: 'Спечелих сертификат "Информатика 6 клас" на Слот Игра Еду!'
    },
    '3bg': {
        title: 'Биология 7 клас',
        image: 'https://lh3.googleusercontent.com/d/1kOXRSlcsbIEc1fBIDVbl3M5pNVhOCleu=w1000',
        description: 'Спечелих сертификат "Биология 7 клас" на Слот Игра Еду!'
    },
    '4bg': {
        title: 'Биология 8 клас',
        image: 'https://lh3.googleusercontent.com/d/1P-T5v_skWWIMsPK29XR3tx6ij8Ku8qc8=w1000',
        description: 'Спечелих сертификат "Биология 8 клас" на Слот Игра Еду!'
    },
    '5bg': {
        title: 'Биология 9 клас',
        image: 'https://lh3.googleusercontent.com/d/1UmMEgFgF0xApmrVAw2EE8Htu0wrQaNgZ=w1000',
        description: 'Спечелих сертификат "Биология 9 клас" на Слот Игра Еду!'
    },
    '1en': {
        title: 'Sample',
        image: 'https://lh3.googleusercontent.com/d/1LcYoEFKjkKb80GTTtDn8njlNqAjyvV9r=w1000',
        description: 'I won certificate "Sample" on Slot Game Edu!'
    },
    '2en': {
        title: 'Informatics 6th grade',
        image: 'https://lh3.googleusercontent.com/d/1CamDrdpnQzHEEjQkKDxoTLcOVhhcZ_IK=w1000',
        description: 'I won certificate "Informatics 6th grade" on Slot Game Edu!'
    },
    '3en': {
        title: 'Biology 7th grade',
        image: 'https://lh3.googleusercontent.com/d/1v4wBG6Ndqs3QGeywE1nVjNDZkH69_Dql=w1000',
        description: 'I won certificate "Biology 7th grade" on Slot Game Edu!'
    },
    '4en': {
        title: 'Biology 8th grade',
        image: 'https://lh3.googleusercontent.com/d/157tQ_SVeo8UDGwAnlXnHQNuVGF5Cialg=w1000',
        description: 'I won certificate "Biology 8th grade" on Slot Game Edu!'
    },
    '5en': {
        title: 'Biology 9th grade',
        image: 'https://lh3.googleusercontent.com/d/1O0C-JBjQ-xWrP1Q2Q_SiDsss4ryqZQ1-=w1000',
        description: 'I won certificate "Biology 9th grade" on Slot Game Edu!'
    },
    '1gr': {
        title: 'Δείγμα',
        image: 'https://lh3.googleusercontent.com/d/1SIBW9g1eXgA5KgwsApfB1AW6un4p5zY1=w1000',
        description: 'Κέρδισα το πιστοποιητικό "Δείγμα" στο Σλοτ Παιχνιδι Edu!'
    },
    '2gr': {
        title: 'Πληροφορική ΣΤ\' τάξης',
        image: 'https://lh3.googleusercontent.com/d/1-I-K0C83bPeAFRA119_6P9A1ZcA1LoT4=w1000',
        description: 'Κέρδισα το πιστοποιητικό "Πληροφορική ΣΤ\' τάξης" στο Σλοτ Παιχνιδι Edu!'
    },
    '3gr': {
        title: 'Βιολογία Α\' Γυμνασίου',
        image: 'https://lh3.googleusercontent.com/d/1f9IqxYVoOKpUg-jZRNmFdAquC6jltHF8=w1000',
        description: 'Κέρδισα το πιστοποιητικό "Βιολογία Α\' Γυμνασίου" στο Σλοτ Παιχνιδι Edu!'
    },
    '4gr': {
        title: 'Βιολογία Β\' Γυμνασίου',
        image: 'https://lh3.googleusercontent.com/d/1BWM3unMOKPI9zrCsXURZuSTF2mNe1nEn=w1000',
        description: 'Κέρδισα το πιστοποιητικό "Βιολογία Β\' Γυμνασίου" στο Σλοτ Παιχνιδι Edu!'
    },
    '5gr': {
        title: 'Βιολογία Γ\' Γυμνασίου',
        image: 'https://lh3.googleusercontent.com/d/1OY-e0I7j5vXftXtmDYBptucGVGIJU9kq=w1000',
        description: 'Κέρδισα το πιστοποιητικό "Βιολογία Γ\' Γυμνασίου" στο Σλοτ Παιχνιδι Edu!'
    }
};

// helper to render the HTML
function renderCertificatePage(url, certificateData) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${certificateData.title}</title>
  
  <meta property="og:url" content="${url.href}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${certificateData.title}" />
  <meta property="og:description" content="${certificateData.description}" />
  <meta property="og:image" content="${certificateData.image}" />
  <meta property="og:image:width" content="980">
  <meta property="og:image:height" content="980">
  <meta property="og:image:alt" content="${certificateData.title}">
  <meta property="fb:app_id" content="800599279174893">
</head>
<body>
  <h1>${certificateData.title}</h1>
  <p>${certificateData.description}</p>
  <img src="${certificateData.image}" alt="${certificateData.title}" />
  <p>Loading the app...</p>
  <script>
    // Redirect to the main app after a short delay
    window.location.href = "https://slotgame-1bi.pages.dev/";
  </script>
</body>
</html>
  `;
}

async function handleRequest(request) {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');

    if (pathParts.length === 3 && pathParts[1] === 'certificate') {
        const certificateId = pathParts[2];
        // try to get requested cert
        let certificateData = CERTIFICATES[certificateId];

        // ✅ fallback: use first certificate if not found
        if (!certificateData) {
            const firstKey = Object.keys(CERTIFICATES)[0];
            certificateData = CERTIFICATES[firstKey];
        }

        const htmlContent = renderCertificatePage(url, certificateData);

        return new Response(htmlContent, {
            headers: { 'Content-Type': 'text/html' }
        });
    }

    // other paths
    return new Response("Not Found", { status: 404 });
}

export default {
    fetch: handleRequest
};