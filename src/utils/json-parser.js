export const readJsonFile = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => callback(e.target.result);
    // eslint-disable-next-line standard/no-callback-literal
    reader.onerror = () => callback('{}');
    reader.readAsText(file);
};

export const downloadJson = (jsonResume) => {
    const jsonString = JSON.stringify(jsonResume);
    const timestamp = new Date().getTime();
    const anchor = document.createElement('a');
    const file = new Blob([jsonString], { type: 'text/json' });

    anchor.href = URL.createObjectURL(file);
    anchor.download = `jsonResume-${timestamp}.json`;
    anchor.click();
};
