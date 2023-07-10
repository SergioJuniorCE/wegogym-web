import type { RequestHandler } from './$types';
import { parse } from 'parse5';

export const POST: RequestHandler = async ({ request }) => {
    const { msLink } = await request.json();
    const res = await fetch(msLink);
    const html = await res.text();

    const doc = parse(html);

    const nameElement = findNode(doc, 'h1');
    const videoElement = findNode(doc, 'iframe');
    const exerciseProfile = findNodeByClass(doc, 'node-stats-block')



    if (!nameElement || !videoElement || !exerciseProfile) {
        // Handle the case where expected elements are not found
        return new Response(JSON.stringify({ error: 'Required elements not found in HTML' }), { status: 500 });
    }

    // ul tag
    const profile = exerciseProfile.childNodes[3];

    // li tags
    const profileItems = profile.childNodes.filter((node: any) => node.tagName === 'li');


    const asd: string[] = [];

    profileItems.forEach((item: any) => {
        item.childNodes.forEach((node: any) => {
            if (node.tagName === 'div' || node.tagName === '#text') {
                if (node.childNodes[0].value) {
                    asd.push(node.childNodes[0].value);
                }
                if (node.childNodes[0].childNodes) {
                    asd.push(node.childNodes[0].childNodes[0].childNodes[0].childNodes[0].value);
                }
            }
            else if (node.tagName === undefined) {
                if (node.value && node.value !== '\n') {
                    let value: string = node.value;
                    asd.push(value.replaceAll(/\n/g, ''));
                }
            }
        });
    });

    asd[asd.length - 1] = asd[asd.length - 1].slice(1, -1).trim();

    const [
        targetMuscleGroup,
        exerciseType,
        equipmentRequired,
        mechanics,
        forceType,
        experienceLevel,
        secondaryMuscles,
    ] = asd;

    const exercise = {
        name: nameElement.childNodes[0].value.split(' Video')[0],
        videoId: videoElement.attrs.find((attr: any) => attr.name === 'src')?.value.split('/').pop().split('?')[0],
        targetMuscleGroup,
        exerciseType,
        equipmentRequired,
        mechanics,
        forceType,
        experienceLevel,
        secondaryMuscles,
    };

    return new Response(JSON.stringify(exercise), { headers: { 'Content-Type': 'application/json' } });
};

function findNode(node: any, tagName: string): any {
    if (node.tagName === tagName) {
        return node;
    }

    if (node.childNodes) {
        for (const childNode of node.childNodes) {
            const foundNode = findNode(childNode, tagName);
            if (foundNode) {
                return foundNode;
            }
        }
    }

    return null;
}

function findNodeByText(node: any, text: string): any {
    if (node.childNodes && node.childNodes[0]?.value === text) {
        return node;
    }

    if (node.childNodes) {
        for (const childNode of node.childNodes) {
            const foundNode = findNodeByText(childNode, text);
            if (foundNode) {
                return foundNode;
            }
        }
    }

    return null;
}

function findNodeByClass(node: any, className: string): any {
    if (node.attrs && node.attrs.find((attr: any) => attr.name === 'class' && attr.value === className)) {
        return node;
    }

    if (node.childNodes) {
        for (const childNode of node.childNodes) {
            const foundNode = findNodeByClass(childNode, className);
            if (foundNode) {
                return foundNode;
            }
        }
    }

    return null;
}
