const additionalEntryAdapters = {
    awards: ({ title, date, awarder, summary }) => ({
        title,
        date,
        subtitle: awarder,
        body: summary,
    }),
    certificates: ({ name, date, issuer, url }) => ({
        title: name,
        date,
        subtitle: issuer,
        url,
    }),
    interests: ({ name, keywords }) => ({
        title: name,
        details: keywords,
    }),
    languages: ({ language, fluency }) => ({
        title: language,
        subtitle: fluency,
    }),
    projects: ({ name, url, startDate, endDate, description, highlights, keywords, roles, entity, type }) => ({
        title: name,
        url,
        startDate,
        endDate,
        subtitle: [roles?.filter(Boolean).join(', '), entity, type].filter(Boolean).join(' · '),
        body: description,
        bullets: highlights,
        details: keywords,
    }),
    publications: ({ name, publisher, releaseDate, url, summary }) => ({
        title: name,
        date: releaseDate,
        subtitle: publisher,
        url,
        body: summary,
    }),
    references: ({ name, reference }) => ({
        title: name,
        body: reference,
    }),
    volunteers: ({ organization, position, url, startDate, endDate, summary, highlights }) => ({
        title: organization,
        subtitle: position,
        url,
        startDate,
        endDate,
        body: summary,
        bullets: highlights,
    }),
};

const getAdditionalEntryViewModel = (type, item) => {
    const adapter = additionalEntryAdapters[type];

    return item && adapter ? adapter(item) : null;
};

export default getAdditionalEntryViewModel;
