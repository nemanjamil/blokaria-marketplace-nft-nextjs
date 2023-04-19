export const handler = (web3, contract) => () => {

    console.log('contract', contract);

    return {
        ownedCourses: {
            data: "Siki"
        }
    }
};