'use client';

import { useBlogContext } from '@/app/context/blogContext';
import SingleBlogView from '@/app/components/singleBlogView';

export default function BlogViewPage() {
    const { selectedBlog, loading } = useBlogContext();

    if (loading || !selectedBlog) {
        return <p>Loading...</p>;
    }

    return (
            <SingleBlogView />
    );
}
