import { getEntry, type CollectionEntry } from 'astro:content';

// The organisation an event points at. Throws on a missing one, so a mistyped
// organisationId fails the build rather than quietly dropping the event.
export async function getOrganisation(
    event: CollectionEntry<'events'>
): Promise<CollectionEntry<'organisations'>> {
    const organisation = await getEntry(event.data.organisationId);

    if (!organisation) {
        throw new Error(
            `Event "${event.id}" points at organisation "${event.data.organisationId.id}", which doesn't exist`
        );
    }

    return organisation;
}
