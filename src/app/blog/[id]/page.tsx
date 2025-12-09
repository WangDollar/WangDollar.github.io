import blogIndex from '@/../public/blogs/index.json'
import BlogClientPage from './client-page'

// 静态生成所有博客文章路径
export async function generateStaticParams() {
	return blogIndex.map((post) => ({
		id: post.slug,
	}))
}

export default function Page() {
	return <BlogClientPage />
}
