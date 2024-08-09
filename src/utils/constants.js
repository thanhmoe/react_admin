export const NOTIFY_STATUS = {
	success: "success",
	warn: "warn",
	error: "error",
	info: "info",
};

export const USER_ROLES = {
	admin: "admin",
	staff: "staff",
};

export const ORDER_STATUS = {
	pending: "pending",
	processing: "processing",
	shipping: "shipping",
	delivered: "delivered",
	cancelled: "cancelled",
}

export const CUSTOMER_LOGIN_FILTER =[
	{
		id: 0,
		sortBy: 'date',
		sortOrder: 'DESC',
		name: 'Date DESC'
	},
	{
        id: 1,
        sortBy: 'date',
        sortOrder: 'ASC',
        name: 'Date ASC'
    },
	{
		id: 2,
		sortBy: 'count',
		sortOrder: 'DESC',
		name: 'Most Data'
	},
	{
        id: 3,
        sortBy: 'count',
        sortOrder: 'ASC',
        name: 'Least Data'
    },
]