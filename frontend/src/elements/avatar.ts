import { h } from './dom';

export interface AvatarProps {
    avatar?: string;
    authorHref?: string;
}

/**
 * Avatar image showing a user's avatar.
 *
 * <a class="warbler-avatar">
 *   <img class="warbler-avatar__img" src={avatar} alt="" height="35" width="35">
 * </a>
 */
export function avatar(props: AvatarProps) {
    const avatar = h(
        'a',
        { className: 'warbler-avatar' },
        props.avatar
            ? h('img', {
                  className: 'warbler-avatar__img',
                  src: props.avatar,
                  alt: '',
                  height: 35,
                  width: 35,
              })
            : h('div', {
                  className: 'warbler-avatar__img warbler-avatar__img--blank',
              })
    );
    if (props.authorHref != null) avatar.href = props.authorHref;
    return avatar;
}
