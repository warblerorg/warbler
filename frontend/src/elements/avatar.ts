import { h } from './dom';

export interface AvatarProps {
    avatar?: string;
    authorHref?: string;
}

/**
 * Avatar image showing a user's avatar.
 *
 * <a class="yacs-avatar">
 *   <img class="yacs-avatar__img" src={avatar} alt="" height="35" width="35">
 * </a>
 */
export function avatar(props: AvatarProps) {
    const avatar = h(
        'a',
        { className: 'yacs-avatar' },
        props.avatar
            ? h('img', {
                  className: 'yacs-avatar__img',
                  src: props.avatar,
                  alt: '',
                  height: 35,
                  width: 35,
              })
            : h('div', {
                  className: 'yacs-avatar__img yacs-avatar__img--blank',
              }),
    );
    if (props.authorHref != null) avatar.href = props.authorHref;
    return avatar;
}
