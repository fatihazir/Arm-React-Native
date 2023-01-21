export const baseUrlForEndpoint = 'https://aspnetclusters-101958-0.cloudclusters.net/api'


export const links = {
    login: '/auth/login',
    register: '/auth/register',
    transactionGroups: '/UserTransactionGroup/getAllByUserId',
    updateTransactionGroup: '/UserTransactionGroup/update',
    deleteTransactionGroup: '/UserTransactionGroup/delete',
    transactions: '/Transaction/getallbygroupId',
    deleteTransaction: '/Transaction/deleteById',
    updateProfile: '/User/update',
    changePassword: '/User/changePassword'
}