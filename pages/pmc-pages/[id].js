import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { getAllIds, getData, getSortedList } from '../../lib/data';
import Layout from '../../components/layout.js';

// create an instance of the getStaticProps() to return data for one person
export async function getStaticProps({ params }) {
    const allData = getSortedList();
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
    const paths = getAllIds();
    return {
        paths,
        fallback: false
    };
}

// make a React.js component to display all details about a person when a dynamic route matches
export default function Entry( { itemData, allData } ) {
    return (
        <main class="card col-6">
            <div class="card-body">
                <h5 class="card-title">{itemData.post_title}</h5>

            </div>
                    <a class="btn btn-primary mt-3" href='../'>Back to Home</a>
            </main>
    );
}