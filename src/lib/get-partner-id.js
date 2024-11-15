function getPartnerId() {
    return function () {
        return 'GENE_PPCP';
    };
}

module.exports = {
    create: getPartnerId,
};