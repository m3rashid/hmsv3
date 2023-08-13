import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2"

import * as modelNames from "./names"

export type Document<T> = Omit<mongoose.Document, '_id'> & T;
export type PaginateModel<T> = mongoose.PaginateModel<Document<T>>;


export interface PaginatedListIResponse<T> {
	docs: T[];
	totalDocs: number;
	limit: number;
	totalPages: number;
	page: number;
	pagingCounter: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage: number | null;
	nextPage: number | null;
}

export const paginatedCompiledModel = <T>(
	name: (typeof modelNames)[keyof typeof modelNames],
	schema: mongoose.Schema<T>
) => {
	schema.plugin(paginate);
	return mongoose.model<Document<T>, PaginateModel<T>>(name, schema as any);
};
