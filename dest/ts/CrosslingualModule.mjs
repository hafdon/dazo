/**
 * It is assumed that there will always be a maximum of one headwordExplanation per transla- tion language in each sense. For this reason, headwordExplanation does not have a listin- gOrder.
 */
function explanationConstraint(lr) {
    return lr.entries.every(function (e) {
        return e.senses.every(function (s) {
            var all = s.headwordExplanations.map(function (_a) {
                var langCode = _a.langCode;
                return langCode;
            });
            var unique = Array.from(new Set(all));
            return all.length === unique.length;
        });
    });
}
var testCase = [
    {
        id: 0,
        langCode: 'en',
        text: 'hello',
    },
    {
        id: 1,
        langCode: 'en',
        text: 'hi',
    },
    {
        id: 2,
        langCode: 'ga',
        text: 'dia duit',
    },
    {
        id: 3,
        langCode: 'es',
        text: 'hola',
    },
];
// test 1
var res = explanationConstraint({
    entries: [{ senses: [{ headwordExplanations: testCase }] }],
});
console.log({ res: res });

export { explanationConstraint };
