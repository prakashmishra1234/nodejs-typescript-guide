import { Query } from "mongoose";

interface QueryString {
  keyword?: string;
  page?: string;
  limit?: string;
  [key: string]: any;
}

/**
 * Utility class to handle advanced query features for Mongoose models.
 * @template T - The type of the Mongoose model.
 */
class ApiFeatures<T> {
  private query: Query<T[], T>;
  private queryStr: QueryString;

  /**
   * Creates an instance of the ApiFeatures class.
   * @param query - The initial Mongoose query object.
   * @param queryStr - The query string object containing filtering, searching, and pagination parameters.
   */
  constructor(query: Query<T[], T>, queryStr: QueryString) {
    this.query = query;
    this.queryStr = queryStr;
  }

  /**
   * Adds a search filter to the query based on the `keyword` parameter.
   * The search is case-insensitive and uses a regular expression.
   * @returns The current instance of the ApiFeatures class.
   */
  search(): this {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  /**
   * Filters the query by removing specified fields (`keyword`, `page`, `limit`) and
   * adding MongoDB operators (e.g., `$gte`, `$lte`) for range filtering.
   * @returns The current instance of the ApiFeatures class.
   */
  filter(): this {
    const queryCopy = { ...this.queryStr };

    // Remove specific fields from the query
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Add MongoDB operators for filtering
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  /**
   * Implements pagination by limiting the number of results per page and skipping results for previous pages.
   * @param resultPerPage - The number of results to display per page.
   * @returns The current instance of the ApiFeatures class.
   */
  pagination(resultPerPage: number): this {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }

  /**
   * Returns the modified Mongoose query object after applying search, filter, and pagination features.
   * @returns The Mongoose query object.
   */
  getQuery(): Query<T[], T> {
    return this.query;
  }
}

export default ApiFeatures;
