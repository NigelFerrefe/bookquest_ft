export interface InfiniteScrollPagination {
  from: number;
  to: number;
  per_page: number;
  current_page: number;
  has_more_pages: boolean;
  next_page: number | null;
  prev_page: number | null;
}

export interface CursorPagination {
  per_page: number;
  has_more_pages: number;
  has_previous_pages: number;
  cursor: {
    current: string | null;
    next: string | null;
    previous: string | null;
  };
}