import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { getAllIds, getData, getSortedList } from '../../lib/data';
import Layout from '../../components/layout.js';

// create an instance of the getStaticProps() to return data for one post
export async function getStaticProps({ params }) {
    const allData = await getSortedList();
    const itemData = await getData(params.id);
    return {
        props: {
            itemData,
            allData
        }
    };
}

// create instance of getStaticPaths() to report to next.js all possible dynamic urls
export async function getStaticPaths() {
    const paths = await getAllIds();
    return {
        paths,
        fallback: false
    };
}

// make a React.js component to display all details about a post when a dynamic route matches
export default function Entry( { itemData } ) {
    // use regular expression to remove wp post's html tags from wp api's provided content before displaying in app
    var regex = /(<([^>]+)>)/ig,
    content = itemData.post_content,
    cleanedPost = content.replace(regex, "");
    // return output for app page:
    return (
        <main class="card col-6">
            <div class="card-body">
                <h5 class="card-title">{itemData.post_title}</h5>
                <p>{itemData.post_date}</p>
                <p>{cleanedPost}</p>

            </div>
                    <a class="btn btn-primary mt-3" href='../'>Back to Home</a>
            </main>
    );
}