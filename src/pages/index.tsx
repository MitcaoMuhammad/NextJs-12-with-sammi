import { Box } from '@mui/system'
import { GetServerSideProps } from 'next'
import { Content, Hero, Sidebar } from 'src/components'
import { BlogsType } from 'src/interfaces/blogs.interface'
import { CategoryType } from 'src/interfaces/categories.interface'
import Layout from 'src/layout/layout'
import SEO from 'src/layout/seo/seo'
import { BlogsService } from 'src/services/blog.service'

const IndexPage = ({ blogs, latestBlogs, categorys }: HomePageProps) => {
	return (
		<SEO>
			<Layout>
				<Hero blogs={blogs.slice(0, 3)} />
				<Box
					sx={{
						display: 'flex',
						gap: '20px',
						flexDirection: { xs: 'column', md: 'row' },
						padding: '20px',
					}}
				>
					<Sidebar latestBlogs={latestBlogs} categories={categorys} />
					<Content blogs={blogs} />
				</Box>
			</Layout>
		</SEO>
	)
}

export default IndexPage

export const getServerSideProps: GetServerSideProps<
	HomePageProps
> = async () => {
	const blogs = await BlogsService.getAllBLogs()
	const latestBlogs = await BlogsService.getLatestBlog()
	const categorys = await BlogsService.getCategories()

	return {
		props: {
			blogs,
			latestBlogs,
			categorys,
		},
	}
}

interface HomePageProps {
	blogs: BlogsType[]
	latestBlogs: BlogsType[]
	categorys: CategoryType[]
}
